import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Button } from "./Button";

type InvoiceErrorProps = {
  errorMessage: string;
  handleGoBack: () => void;
  handleScanOtherInvoice: () => void;
};

export function InvoiceError({
  errorMessage,
  handleGoBack,
  handleScanOtherInvoice
}: InvoiceErrorProps) {
  return (
    <View className="min-h-screen p-4 flex flex-col items-center justify-center gap-8 bg-background">
      <View className="text-center gap-4">
        <View className="w-32 h-32 bg-red-200 rounded-2xl flex items-center justify-center mx-auto">
          <Feather name="alert-triangle" size={64} color="red" />
        </View>
        <Text className="text-2xl font-semibold text-center color-red-600">Erro na Leitura</Text>
        <Text className=" text-center max-w-md text-neutral-500">
          Não foi possível processar a nota fiscal. Verifique se o QR Code está nítido e tente novamente.
        </Text>
      </View>

      <View className="gap-3 text-center text-sm text-muted-foreground max-w-md">
        <View className="p-4 bg-muted/70 rounded-xl gap-2">
          {errorMessage ? (
            <>
              <Text className="font-semibold text-center">Detalhes do erro:</Text>
              <Text className="text-neutral-500">{errorMessage}</Text>
            </>
          ) : (
            <>
              <Text className="font-medium text-foreground">Possíveis causas:</Text>
              <View className="gap-1 text-left">
                <View>• QR Code danificado ou ilegível</View>
                <View>• Iluminação inadequada</View>
                <View>• Nota fiscal inválida ou expirada</View>
                <View>• Problemas de conexão com a internet</View>
              </View>
            </>
          )}
        </View>
      </View>

      <View className="w-2/3 gap-4">
        <Button
          onPress={handleScanOtherInvoice}
          className="gap-2"
        >
          <Feather name="rotate-ccw" size={16} color="white" />
          <Text className="text-white font-normal">Tentar Novamente</Text>
        </Button>
        <Button variant="secondary" onPress={handleGoBack}>
          <Text>Voltar ao Início</Text>
        </Button>
      </View>
    </View>
  );
}