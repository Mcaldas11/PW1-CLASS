<template>
  <div class="watchvault">
    <h2>WatchVault</h2>

    <!-- Contador -->
    <p class="counter">
      Total: {{ totalItems }} items ({{ totalSeries }} series, {{ totalMovies }} movies)
    </p>

    <!-- Formulário -->
    <form @submit.prevent="addItem" class="form">
      <fieldset>
        <legend>Type</legend>
        <label><input type="radio" value="Series" v-model="newItem.type" required /> Series</label>
        <label><input type="radio" value="Movie" v-model="newItem.type" required /> Movie</label>
      </fieldset>

      <div>
        <label>Name:</label>
        <input
          type="text"
          v-model.trim="newItem.name"
          placeholder="Enter name"
          required
          minlength="3"
        />
      </div>

      <fieldset>
        <legend>Category</legend>
        <label><input type="radio" value="Drama" v-model="newItem.category" required /> Drama</label>
        <label><input type="radio" value="Comedy" v-model="newItem.category" required /> Comedy</label>
        <label><input type="radio" value="Action" v-model="newItem.category" required /> Action</label>
        <label><input type="radio" value="Sci-Fi" v-model="newItem.category" required /> Sci-Fi</label>
      </fieldset>

      <div class="rating">
        <label>Rating:</label>
        <div class="stars">
          <span
            v-for="star in 10"
            :key="star"
            class="star"
            :class="{ selected: star <= newItem.rating }"
            @click="newItem.rating = star"
          >★</span>
        </div>
      </div>

      <div class="buttons">
        <button type="submit">Add to Watchlist</button>
        <button type="button" @click="clearForm">Clear Form</button>
      </div>
    </form>

    <!-- Ordenação -->
    <div class="sort-section">
      <label>Sort by:</label>
      <select v-model="sortBy" @change="sortItems">
        <option value="name">Alphabetically</option>
        <option value="rating">Rating</option>
      </select>
      <button @click="toggleSortOrder">
        {{ sortOrder === 'asc' ? '⬆️ Asc' : '⬇️ Desc' }}
      </button>
    </div>

    <!-- Lista -->
    <table v-if="items.length" class="watchlist">
      <thead>
        <tr>
          <th>Type</th>
          <th>Name</th>
          <th>Category</th>
          <th>Rating</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortedItems" :key="item.id">
          <td>{{ item.type }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.rating }}</td>
          <td>
            <button @click="removeItem(item)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="empty">No items added yet. Add your first one!</p>
  </div>
</template>

<script>
export default {
  name: "WatchVault",
  data() {
    return {
      items: [],
      newItem: {
        type: "Series",
        name: "",
        category: "Drama",
        rating: 0,
      },
      sortBy: "name",
      sortOrder: "asc",
    };
  },
  computed: {
    totalItems() {
      return this.items.length;
    },
    totalSeries() {
      return this.items.filter((i) => i.type === "Series").length;
    },
    totalMovies() {
      return this.items.filter((i) => i.type === "Movie").length;
    },
    sortedItems() {
      const sorted = [...this.items].sort((a, b) => {
        if (this.sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else if (this.sortBy === "rating") {
          return a.rating - b.rating;
        }
      });
      return this.sortOrder === "asc" ? sorted : sorted.reverse();
    },
  },
  methods: {
    addItem() {
      if (!this.newItem.name || this.newItem.name.length < 3) {
        alert("Name must have at least 3 characters!");
        return;
      }
      if (this.items.some((i) => i.name.toLowerCase() === this.newItem.name.toLowerCase())) {
        alert("This item already exists in your watchlist!");
        return;
      }

      const newEntry = {
        ...this.newItem,
        id: Date.now(),
      };
      this.items.push(newEntry);
      this.saveToLocalStorage();
      this.clearForm();
    },
    clearForm() {
      this.newItem = {
        type: "Series",
        name: "",
        category: "Drama",
        rating: 0,
      };
    },
    removeItem(item) {
      if (confirm(`Are you sure you want to remove "${item.name}"?`)) {
        this.items = this.items.filter((i) => i.id !== item.id);
        this.saveToLocalStorage();
      }
    },
    sortItems() {
      this.items = [...this.sortedItems];
    },
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    },
    saveToLocalStorage() {
      localStorage.setItem("watchvault-items", JSON.stringify(this.items));
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem("watchvault-items");
      if (data) {
        this.items = JSON.parse(data);
      }
    },
  },
  mounted() {
    this.loadFromLocalStorage();
  },
};
</script>

<style scoped>
.watchvault {
  max-width: 800px;
  margin: auto;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form {
  background: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}

fieldset {
  border: none;
  margin-bottom: 0.5rem;
}

.stars {
  cursor: pointer;
  font-size: 1.4rem;
  color: #ccc;
}

.star.selected {
  color: gold;
}

.watchlist {
  width: 100%;
  border-collapse: collapse;
}

.watchlist th, .watchlist td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: center;
}

.sort-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.buttons button {
  margin-right: 0.5rem;
}

.empty {
  text-align: center;
  color: #666;
  font-style: italic;
}
</style>
