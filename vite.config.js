import { defineConfig, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

const resolveAlias = Object.fromEntries(
  Object.entries({
    "@assets": "./src/assets", // CSS나 다른 라이브러리 파일들
    "@components": "./src/components", // 컴포넌트
    "@pages": "./src/pages", // router-view로 표시할 페이지
    "@router": "./src/router", // Router
    "@utils": "./src/utils", // 암호화나 날짜계산 등 유틸함수
  }).map(([key, value]) => [key, path.resolve(__dirname, value)]),
);

export default defineConfig(({ mode }) => {
  return {
    plugins: [vue(), splitVendorChunkPlugin()],
    resolve: {
      alias: resolveAlias,
    },
  };
});
