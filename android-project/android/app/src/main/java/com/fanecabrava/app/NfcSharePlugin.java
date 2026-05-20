package com.fanecabrava.app;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.IntentFilter;
import android.nfc.NdefMessage;
import android.nfc.NdefRecord;
import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.nfc.tech.Ndef;
import android.nfc.tech.NdefFormatable;
import android.os.Build;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.nio.charset.StandardCharsets;

@CapacitorPlugin(name = "NfcShare")
public class NfcSharePlugin extends Plugin {

    private static final String APP_MIME = "application/com.fanecabrava.app.nfc";
    private NfcAdapter nfcAdapter;
    private PendingIntent pendingIntent;
    private IntentFilter[] intentFilters;
    private String[][] techLists;
    private boolean listening = false;

    @Override
    public void load() {
        Activity activity = getActivity();
        nfcAdapter = NfcAdapter.getDefaultAdapter(activity);
        if (nfcAdapter == null) return;

        Intent intent = new Intent(activity, activity.getClass());
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        int flags = Build.VERSION.SDK_INT >= 31 ? PendingIntent.FLAG_MUTABLE : 0;
        pendingIntent = PendingIntent.getActivity(activity, 0, intent, flags);

        // Filtros: NDEF da nosa app + calquera tag
        IntentFilter mimeFilter = new IntentFilter(NfcAdapter.ACTION_NDEF_DISCOVERED);
        try { mimeFilter.addDataType(APP_MIME); } catch (Exception ignored) {}

        IntentFilter tagFilter = new IntentFilter(NfcAdapter.ACTION_TAG_DISCOVERED);

        intentFilters = new IntentFilter[]{ mimeFilter, tagFilter };
        techLists = new String[][]{
            new String[]{ Ndef.class.getName() },
            new String[]{ NdefFormatable.class.getName() }
        };
    }

    @PluginMethod
    public void startListening(PluginCall call) {
        if (nfcAdapter == null) {
            call.resolve(result(false, "NFC hardware not available"));
            return;
        }
        if (!nfcAdapter.isEnabled()) {
            call.resolve(result(false, "NFC disabled"));
            return;
        }
        Activity activity = getActivity();
        activity.runOnUiThread(() ->
            nfcAdapter.enableForegroundDispatch(activity, pendingIntent, intentFilters, techLists)
        );
        listening = true;
        call.resolve(result(true, null));
    }

    @PluginMethod
    public void stopListening(PluginCall call) {
        if (nfcAdapter != null && listening) {
            Activity activity = getActivity();
            activity.runOnUiThread(() -> nfcAdapter.disableForegroundDispatch(activity));
            listening = false;
        }
        call.resolve();
    }

    @PluginMethod
    public void isAvailable(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("available", nfcAdapter != null);
        ret.put("enabled", nfcAdapter != null && nfcAdapter.isEnabled());
        call.resolve(ret);
    }

    /** Chamado por MainActivity.onNewIntent */
    public void handleNfcIntent(Intent intent) {
        if (!listening) return;

        String action = intent.getAction();

        // Se o outro dispositivo escribiu o noso NDEF → dispara directo
        if (NfcAdapter.ACTION_NDEF_DISCOVERED.equals(action)) {
            notifyListeners("nfcDetected", new JSObject().put("source", "ndef"));
            return;
        }

        // Tag descubierto → tentamos escribir NDEF para que o outro tamén reaccione
        if (NfcAdapter.ACTION_TAG_DISCOVERED.equals(action) ||
            NfcAdapter.ACTION_TECH_DISCOVERED.equals(action)) {

            notifyListeners("nfcDetected", new JSObject().put("source", "tag"));

            Tag tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
            if (tag != null) writeNdefToTag(tag);
        }
    }

    /** Escribe un NDEF na tag detectada para que o outro dispositivo tamén dispare */
    private void writeNdefToTag(Tag tag) {
        try {
            NdefRecord mimeRecord = NdefRecord.createMime(
                APP_MIME,
                "faneca-brava-nfc".getBytes(StandardCharsets.UTF_8)
            );
            NdefRecord aarRecord = NdefRecord.createApplicationRecord("com.fanecabrava.app");
            NdefMessage msg = new NdefMessage(new NdefRecord[]{ mimeRecord, aarRecord });

            Ndef ndef = Ndef.get(tag);
            if (ndef != null) {
                ndef.connect();
                if (ndef.isWritable()) ndef.writeNdefMessage(msg);
                ndef.close();
                return;
            }
            // Tag baleira: formateamos primeiro
            NdefFormatable formatable = NdefFormatable.get(tag);
            if (formatable != null) {
                formatable.connect();
                formatable.format(msg);
                formatable.close();
            }
        } catch (Exception ignored) {}
    }

    private JSObject result(boolean available, String reason) {
        JSObject o = new JSObject();
        o.put("available", available);
        if (reason != null) o.put("reason", reason);
        return o;
    }

    @Override
    protected void handleOnResume() {
        super.handleOnResume();
        if (nfcAdapter != null && nfcAdapter.isEnabled() && listening) {
            Activity activity = getActivity();
            activity.runOnUiThread(() ->
                nfcAdapter.enableForegroundDispatch(activity, pendingIntent, intentFilters, techLists)
            );
        }
    }

    @Override
    protected void handleOnPause() {
        super.handleOnPause();
        if (nfcAdapter != null) {
            Activity activity = getActivity();
            activity.runOnUiThread(() -> nfcAdapter.disableForegroundDispatch(activity));
        }
    }
}
