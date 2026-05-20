package com.fanecabrava.app;

import android.content.Intent;
import android.nfc.NfcAdapter;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.PluginHandle;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(android.os.Bundle savedInstanceState) {
        // Rexistra o plugin NFC antes de que o Bridge arranque
        registerPlugin(NfcSharePlugin.class);
        super.onCreate(savedInstanceState);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);

        String action = intent.getAction();
        if (NfcAdapter.ACTION_NDEF_DISCOVERED.equals(action)
                || NfcAdapter.ACTION_TAG_DISCOVERED.equals(action)
                || NfcAdapter.ACTION_TECH_DISCOVERED.equals(action)) {

            // Obtén o PluginHandle e logo a instancia real do plugin
            PluginHandle handle = getBridge().getPlugin("NfcShare");
            if (handle != null) {
                NfcSharePlugin plugin = (NfcSharePlugin) handle.getInstance();
                if (plugin != null) {
                    plugin.handleNfcIntent(intent);
                }
            }
        }
    }
}
