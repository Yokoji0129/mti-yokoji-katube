import { ref } from "vue";

// 自分のエンドポイントに置き換えてください
export const baseUrl = 'https://rb2c4ii1nl.execute-api.ap-northeast-1.amazonaws.com';

//ローディングアニメーションフラグ
export let isLoading = ref(false);

//料理ジャンルのデータ
export const cookingGenre = [
    { text: "中華料理" },
    { text: "和食" },
    { text: "洋食" },
    { text: "韓国料理" },
];

//アレルギー項目のデータ
export const allergyOptions = [
    { text: "卵" },
    { text: "乳" },
    { text: "小麦" },
    { text: "そば" },
    { text: "落花生" },
    { text: "大豆" },
    { text: "魚" },
    { text: "甲殻類" },
    { text: "ナッツ類" },
    { text: "ゴマ" },
    { text: "コーン" },
    { text: "カゼイン" },
    { text: "イースト" },
    { text: "肉類" },
    { text: "シナモン" },
];