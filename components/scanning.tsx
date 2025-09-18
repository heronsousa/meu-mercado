import { Button } from "@/components/Button";
import { BarcodeScanningResult, CameraView } from "expo-camera";
import { Text, View } from "react-native";

type ScanningProps = {
  setScanningStep: (step: "idle") => void;
  handleBarcodeScanned: (scanningResult: BarcodeScanningResult) => void;
};

function Scanning({ handleBarcodeScanned, setScanningStep }: ScanningProps) {
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
        <Button
          className="my-4 w-1/4"
          onPress={() => setScanningStep("idle")}
        >
          <Text className="text-white">Cancelar</Text>
        </Button>
      </View>
    </View>
  );
}

export default Scanning;