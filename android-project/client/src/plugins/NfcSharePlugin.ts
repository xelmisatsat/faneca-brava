import { registerPlugin } from '@capacitor/core';

export interface NfcSharePlugin {
  /** Activa o foreground dispatch — devolve se NFC está dispoñible e activado */
  startListening(): Promise<{ available: boolean; reason?: string }>;
  /** Desactiva o foreground dispatch */
  stopListening(): Promise<void>;
  /** Comproba se o hardware NFC existe e está activado */
  isAvailable(): Promise<{ available: boolean; enabled: boolean }>;
  /** Engade un listener para eventos NFC detectados */
  addListener(
    event: 'nfcDetected',
    handler: (data: { detected: boolean; action?: string }) => void
  ): Promise<{ remove: () => void }>;
  /** Elimina todos os listeners */
  removeAllListeners(): Promise<void>;
}

const NfcShare = registerPlugin<NfcSharePlugin>('NfcShare');

export default NfcShare;
