<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

onMounted(async () => {
  const token = route.query.token;

  if (token) {
    try {
      localStorage.setItem("token", token);
      await authStore.fetchUserGoogle(token);
      // localStorage.setItem("isHardRefresh", "false");
      router.push({ path: "/", query: { showLoginSuccessAlert: "true" } });
    } catch (error) {
      console.error("Failed to fetch user with Google token:", error);
      localStorage.removeItem("token");
      router.push("/login");
    }
  } else {
    console.error("Token not found");
    router.push("/login");
  }
});
</script>
