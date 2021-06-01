<template>
  <div>
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>Категории</h3>
        </div>
        <section>
          <app-loader v-if="loading"></app-loader>
          <div class="row" v-else>
            <category-create @created="addNewCategory"></category-create>
            <category-edit :categories = 'categories' @update= 'updateCategory' :key = 'updateCount' v-if="categories.length"></category-edit>
            <p v-else class="center ">Категорий пока нет!</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import categoryCreate from "../components/categoryCreate";
import categoryEdit from "../components/categoryEdit";
import appLoader from "../components/app/loader";

export default {

  components: {
    categoryCreate,
    categoryEdit,
    appLoader,
  },
  data() {
    document.title = `Категории | crm system`
    return {
      categories: [],
      loading: true,
      updateCount : 0
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("loadCategories");
    this.loading = false;
    console.log(this.categories);
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
      console.log("category", this.categories);
    },
    updateCategory(data){
      const idx = this.categories.findIndex(c => c.id === data.id)
      this.categories[idx] = data
      this.updateCount++
    }

  },
};
</script>
