import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  btn: {
    backgroundColor: "#000",
    padding: height * 0.02,
    borderRadius: 15,
    borderWidth: 2,
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
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 0.1 * height
  }
});



