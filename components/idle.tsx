import { Button } from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

type IdleProps = {
  handleScanQRCode: () => void;
};

export function Idle({ handleScanQRCode }: IdleProps) {
  return (
    <View className="min-h-screen p-4 flex flex-col items-center justify-center bg-background">
      <LinearGradient
        colors={["#F45D48", "#F7A399"]}
        start={[0, 0]}
        end={[1, 1]}
        style={{ borderRadius: 8 }}
        className="w-32 h-32 flex items-center justify-center mx-auto shadow-glow mb-6"
      >
        <Ionicons name="qr-code-outline" size={64} color="white" />
      </LinearGradient>
      <Text className="text-3xl font-bold">Escanear Nota Fiscal</Text>
      <Text className="text-lg max-w-md text-center mt-8">
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
