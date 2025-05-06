import { StyleSheet, Dimensions } from "react-native";

// Constantes das dimensões da tela
const { width, height } = Dimensions.get("window");

// Função default
export default estilo = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  btn: {
    backgroundColor: "#808080",
    padding: height * 0.02,
    borderRadius: 15,
    borderColor: "#ffffff",
    marginBottom: 0.01 * height,
  },
  txt: {
    color: "#fff",
    textAlign: "center"
  },
  titulo: {
    color: "#fff",
    fontSize: 40,
    backgroundColor: "#595959",
    borderRadius: 10,
    padding: 10,
    marginBottom: 0.1 * height
  }
});


