import { Button } from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  async function handleScanQRCode() {
    if (!permission?.granted) {
      requestPermission().then((result) => {
        if (result.granted) {
          setShowCamera(true);
        }
      });
    } else {
      setShowCamera(true);
    }
  }

  function handleBarcodeScanned({ data }: { data: string }) {
    setScannedData(data);
    setShowCamera(false);
  }

  if (showCamera) {
    return (
      <View className="flex-1 bg-background">
        <CameraView
          style={{ flex: 1 }}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={handleBarcodeScanned}
        />
        <View className="items-center">
          <Text className="mt-4 text-lg font-bold">
            Aponte para o QR Code...
          </Text>
          <Button className="my-4 w-1/4" onPress={() => setShowCamera(false)}>
            <Text className="text-white">Cancelar</Text>
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View className="min-h-screen p-4 flex flex-col items-center justify-center bg-background">
      <LinearGradient
        colors={["#F45D48", "#F7A399"]}
        start={[0, 0]}
        end={[1, 1]}
        className="w-32 h-32 flex items-center justify-center mx-auto shadow-glow mb-6"
      >
        <Ionicons name="qr-code-outline" size={64} color="white" />
      </LinearGradient>
      <Text className="text-3xl font-bold">Escanear Nota Fiscal</Text>
      <Text className="text-muted-foreground max-w-md text-center mt-8">
        Aponte a câmera para o QR Code da sua nota fiscal eletrônica (NFC-e)
        para importar automaticamente os dados da compra
      </Text>

      <Button
        size="lg"
        className="w-full max-w-sm flex gap-2 my-8 h-16"
        onPress={handleScanQRCode}
      >
        <Ionicons name="camera" size={24} color="white" />
        <Text className="text-lg font-bold text-white">
          Iniciar Escaneamento
        </Text>
      </Button>

      {scannedData && (
        <View className="bg-card p-4 rounded-lg mt-4">
          <Text className="font-bold">QR Code:</Text>
          <Text>{scannedData}</Text>
        </View>
      )}

      <View className="text-center max-w-md text-sm text-muted-foreground">
        <Text className="text-center">
          💡 <Text className="font-bold">Dica:</Text> O QR Code geralmente está
          no final da nota fiscal
        </Text>
        <Text className="text-center mt-2">
          📱 Certifique-se de que há boa iluminação para melhor leitura
        </Text>
      </View>
    </View>
  );
}
