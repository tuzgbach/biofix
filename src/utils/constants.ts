export type District = {
    key: string
    label: string
    value: string
    parent: string
}

export type Districts = {
    [key: string]: District[]
}

export type Province = {
    key: string
    Label: string
    value: string
}

export const CustomerDemand = {
    ORDER: { name: { en: 'order', vi: 'Đặt hàng' }, value: 'ORDER' }, // đặt hàng
    COOPERATE: { name: { en: 'cooperate', vi: 'Hợp tác' }, value: 'COOPERATE' }, // hợp tác
    ADVISE: { name: { en: 'advise', vi: 'Tư vấn' }, value: 'ADVISE' }, // tư vấn
    QUESTION: { name: { en: 'question', vi: 'Câu hỏi' }, value: 'QUESTION' }, // câu hỏi
    OTHER: { name: { en: 'other', vi: 'Khác' }, value: 'OTHER' }, // khác
}

export const CustomerState = {
    PENDING: { name: { en: 'pending', vi: 'Chờ xử lý' }, value: 'PENDING' }, // chờ xử lý
    COMPLETED: { name: { en: 'done', vi: 'Đã xử lý' }, value: 'COMPLETED' }, // đã xử lý
}
