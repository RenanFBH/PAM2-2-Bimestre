import { StyleSheet, Dimensions } from "react-native";

// Constantes das dimensões da tela
const { width, height } = Dimensions.get("window");

// Função default
export default estilo = new StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
  },
  btn: {
    backgroundColor: "#404040",
    padding: height * 0.02,
    borderRadius:10,
    marginBottom: 0.01 * height
  },
  txt: {
    color: "#fff",
    textAlign: "center"
  }
});


