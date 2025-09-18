import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

function Processing() {
  return (
    <View className="min-h-screen p-4 flex flex-col items-center justify-center gap-8 bg-background">
      <View className="text-center gap-4">
        <View className="w-32 h-32 bg-success/10 rounded-3xl flex items-center justify-center mx-auto">
          <Feather name="check-square" size={46} color="green" />
        </View>
        <Text className="text-2xl font-bold">Processando Dados...</Text>
        <Text className="text-muted-foreground">
          Extraindo informações da nota fiscal
        </Text>
      </View>
      
      <View className="gap-2 text-center text-sm text-muted-foreground">
        <Text>✅ QR Code lido com sucesso</Text>
        <Text>🔄 Buscando dados da nota fiscal...</Text>
        <Text>📊 Categorizando produtos...</Text>
      </View>
    </View>
  );
}

export default Processing;