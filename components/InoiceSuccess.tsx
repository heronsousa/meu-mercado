import { Nfce } from "@/types";
import { Feather } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { Card } from "./Card";

type InvoiceSuccessProps = {
  nfce: Nfce;
};

function InvoiceSuccess({ nfce }: InvoiceSuccessProps) {
  return (
    <ScrollView className="min-h-screen p-4 gap-6 bg-background pt-100 mb-12">
      <View className="text-center gap-4 flex items-center">
        <View className="w-16 h-16 bg-success rounded-2xl flex items-center justify-center mx-auto">
          <Feather name="check-square" size={24} color="green" />
        </View>
        <Text className="text-2xl font-bold text-success">
          Nota Fiscal Processada!
        </Text>
        <Text className="text-muted-foreground">
          Dados extraídos e categorizados automaticamente
        </Text>
      </View>

      <Card className="card-financial p-4 gap-8">
        <View className="flex items-start gap-4">
          <View className="flex-row items-center gap-2">
            <View className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Feather name="shopping-bag" size={16} color="red" />
            </View>
            <Text className="text-lg font-semibold">{nfce.market}</Text>
          </View>
          <View className="gap-1 text-muted-foreground">
            <View className="flex flex-row items-center gap-2">
              <Feather name="map-pin" size={12} color="red" />
              <Text className="text-xs">
                {nfce.neighborhood} - {nfce.city}, {nfce.state}{" "}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Feather name="calendar" size={12} color="red" />
              <Text className="text-xs">{nfce.date}</Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Feather name="credit-card" size={12} color="red" />
              <Text className="text-xs">{nfce.paymentMethod}</Text>
            </View>
          </View>
        </View>
        <View className="text-right">
          <Text className="text-muted-foreground">Total</Text>
          <Text className="text-xl font-bold">R$ {nfce.totalPrice}</Text>
        </View>
      </Card>

      <Card className="card-financial p-4 my-8">
        <Text className="text-lg font-semibold mb-4">
          Produtos ({nfce.products?.length})
        </Text>
        <View className="gap-3">
          {nfce.products?.map((item) => (
            <View
              key={item.id}
              className="flex flex-row items-center justify-between p-3 bg-muted rounded-lg gap-2"
            >
              <View style={{ maxWidth: "70%" }}>
                <View className="flex self-start">
                  <Text
                    className={`px-2 rounded-full text-[10px] font-medium bg-[#7f8c8d]`}
                  >
                    {item.categoryId.split("-")[0]}
                  </Text>
                </View>
                {/* <View className="flex flex-row items-center gap-2 mb-1"> */}
                <Text className="font-medium">{item.description}</Text>
                {/* </View> */}
                <Text className="text-sm text-muted-foreground">
                  Qtd: {item.qtd} × R${" "}
                  {(Number(item.price) / Number(item.qtd)).toFixed(2)}
                </Text>
              </View>
              <Text className="font-semibold w-16 text-right">
                R$ {item.price}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Botões de Ação */}
      {/* <View className="flex gap-4">
          <Button
            variant="success"
            onClick={handleSaveInvoice}
            className="flex-1"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Salvar Nota Fiscal
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Escanear Outra
          </Button>
        </View> */}
    </ScrollView>
  );
}

export default InvoiceSuccess;