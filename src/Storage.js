import { AsyncStorage } from "react-native"


export async function storeData(key, data) {
    await AsyncStorage.setItem(key, JSON.stringify(data))
}

export async function retrieveData(key) {
    let data = await AsyncStorage.getItem(key)
    return JSON.parse(data)
}

export function clearData() {
    AsyncStorage.clear()
}