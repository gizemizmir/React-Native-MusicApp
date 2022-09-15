import { StyleSheet } from "react-native";

export default StyleSheet.create({
  musicItem: {
    width: "100%",
    height: 90,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    alignSelf: "center",
  },
  musicImage: {
    width: "25%",
    height: 90,
    border: 1,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
  },
  musicDetails: {
    width: "60%",
    height: 90,
    display: "flex",
    flexDirection: "column",
  },
  musicName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    flex: 1,
  },
});
