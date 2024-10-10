<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSidebarStore } from '../stores/sideBarStore'

const isDropdownOpen = ref(false)

function accountStatus(): void {
  isDropdownOpen.value = !isDropdownOpen.value
  console.log(isDropdownOpen.value)
}

/**
 * page
 */
const sidebarStore = useSidebarStore()

const isActive = (path: string) => computed(() => sidebarStore.activePath.startsWith(path))
</script>

<template>
  <div>
    <div class="sidebar">
      <div class="pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <div class="icon-circle white-circle">
              <img src="../assets/icons/home.svg" alt="home" class="pink-icon" />
            </div>
            <a
              class="nav-link"
              :class="{ 'active-link': isActive('/dashboard').value }"
              href="/dashboard"
              >Dashboard</a
            >
          </li>
          <li class="nav-item">
            <div class="icon-circle pink-circle">
              <img src="../assets/icons/kid_star.svg" alt="kid_star" class="white-icon" />
            </div>
            <a class="nav-link" :class="{ 'active-link': isActive('/stock').value }" href="/stock"
              >Stock Manage</a
            >
          </li>
          <!-- <li class="nav-item">
            <div class="icon-circle pink-circle">
              <img src="../assets/icons/deceased.svg" alt="deceased" class="white-icon"/>
            </div>
            <a class="nav-link" :class="{ 'active-link': isActive('/ship-status').value }" href="/ship-status">Shipping Status</a>
          </li> -->
          <li class="nav-item">
            <div class="icon-circle white-circle">
              <img src="../assets/icons/history.svg" alt="history" class="pink-icon" />
            </div>
            <a
              class="nav-link"
              :class="{ 'active-link': isActive('/history').value }"
              href="/history"
              >History</a
            >
          </li>
          <li class="nav-item">
            <div class="icon-circle pink-circle">
              <img src="../assets/icons/deceased.svg" alt="deceased" class="white-icon" />
            </div>
            <a
              class="nav-link"
              :class="{ 'active-link': isActive('/transaction-status').value }"
              href="/transaction-status"
              >Transaction Status</a
            >
          </li>
          <li class="nav-item">
            <div class="icon-circle white-circle">
              <img
                src="../assets/icons/settings-heart.svg"
                alt="settings_heart"
                class="pink-icon"
              />
            </div>
            <a
              class="nav-link"
              :class="{ 'active-link': isActive('/setting').value }"
              href="/setting"
              >Setting</a
            >
          </li>
          <li class="nav-item">
            <div class="icon-circle pink-circle">
              <img src="../assets/icons/savings.svg" alt="savings" class="white-icon" />
            </div>
            <a class="nav-link" :class="{ 'active-link': isActive('/money').value }" href="/money"
              >Money Manage</a
            >
          </li>
          <li class="nav-item">
            <div class="icon-circle white-circle">
              <img src="../assets/icons/monitoring_pink.svg" alt="monitoring" class="pink-icon" />
            </div>
            <a
              class="nav-link"
              :class="{ 'active-link': isActive('/analysis').value }"
              href="/analysis"
              >Analysis</a
            >
          </li>
          <li class="nav-item">
            <div class="icon-circle pink-circle">
              <img
                src="../assets/icons/mark_unread_chat_alt.svg"
                alt="mark_unread_chat_alt"
                class="white-icon"
              />
            </div>
            <a
              class="nav-link"
              :class="{ 'active-link': isActive('/messages').value }"
              href="/messages"
              >Messages</a
            >
          </li>
        </ul>
      </div>
      <div class="dropdown-container">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" @click="accountStatus">
            Sarina
          </button>
          <ul v-if="isDropdownOpen" class="dropdown-menu" :class="{ 'show-menu': isDropdownOpen }">
            <li>
              <a class="dropdown-item" href="/setting">
                <img
                  src="../assets/icons/settings-heart.svg"
                  alt="settings_heart"
                  style="margin-right: 8px"
                />
                <div class="menu">Setting</div>
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/messages">
                <img
                  src="../assets/icons/mark_unread_chat_pink.svg"
                  alt="message_pink"
                  style="margin-right: 8px"
                />
                <div class="menu">Messages</div>
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/logout">
                <img src="../assets/icons/logout.svg" alt="logout" style="margin-right: 8px" />
                <div class="menu">Sign out</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 300px;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #dcedff75;
  transition: left 0.3s;
  box-shadow: 4px 0 6px -1px #a9b1c5;
  position: relative;
  position: fixed;
  z-index: 900;
}

.pt-3 {
  padding-top: 6rem !important;
}

.dropdown-container {
  /* position: absolute;
  bottom: 10px; */
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50%;
}

.dropdown-item {
  display: flex;
}

.dropdown-menu {
  position: absolute;
  top: -277%;
  display: none;
  background-color: #fffbfd;
  border-color: #fffbfd;
  color: #b9a8b1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
}

.show-menu {
  display: block;
}

.nav-item {
  font-size: 20px;
  text-align: left;
  padding: 15px;
  display: flex;
  align-items: center;
}

.nav-link {
  color: #8c8a99;
  padding-left: 12px;
}

.nav-link:hover,
.nav-link:active,
.nav-link:focus {
  color: #e8a2b8;
}

.active-link {
  color: #e8a2b8;
  font-weight: bold;
}

.icon-circle {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.white-circle {
  background-color: #fffaf7;
}

.pink-circle {
  background-color: #e8a5bb;
}

.white-icon {
  color: #fffaf7;
}

.pink-icon {
  color: #e8a5bb;
}

.dropdown-toggle {
  background-color: #e8a5bb;
  border-color: #ebc1cd;
  width: 200px;
  font-size: 18px;
}

.dropdown-toggle:hover,
.dropdown-toggle:focus,
.dropdown-toggle:active {
  background-color: #eda3b8;
  border-color: #eda3b8;
}

.menu {
  color: #7c7a87;
}
</style>
