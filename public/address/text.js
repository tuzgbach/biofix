import { Label } from "flowbite-react"
import { readFile, writeFile } from "fs"

// Đọc file JSON
readFile("district.json", "utf8", (err, data) => {
    if (err) {
        console.error(err)
        return
    }

    // Chuyển đổi JSON thành đối tượng
    const obj = JSON.parse(data)

    // Chuyển đổi các đối tượng thành mảng
    const arr = Object.values(obj).reduce((acc, cur) => {
        if (!acc[cur.parent_code]) {
            acc[cur.parent_code] = []
        }
        acc[cur.parent_code].push({
            key: cur.key,
            label: cur.label,
            value: cur.value,
            parent: cur.parent_code,
        })
        return acc
    }, {})

    // Chuyển đổi mảng thành JSON
    const json = JSON.stringify(arr, null, 2)

    // Ghi mảng vào file mới
    writeFile("district_array.json", json, "utf8", (err) => {
        if (err) {
            console.error(err)
            return
        }

    })
})
