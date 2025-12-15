<script>
import { reactive, ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useDishesStore } from '@/stores/dishes'

export default defineComponent({
  setup() {
    const router = useRouter()
    const dishesStore = useDishesStore()

    const categories = [
      { value: 'starters', label: 'Entradas' },
      { value: 'mains', label: 'Pratos Principais' },
      { value: 'desserts', label: 'Sobremesas' },
      { value: 'drinks', label: 'Bebidas' },
    ]

    const form = reactive({
      name: '',
      description: '',
      price: null,
      category: categories[0].value,
      available: true,
      imageUrl: '',
    })

    const errors = reactive({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '',
    })

    const isSubmitting = ref(false)

    function validate() {
      errors.name = form.name.trim() ? '' : 'Nome é obrigatório.'
      errors.description = form.description.trim() ? '' : 'Descrição é obrigatória.'
      errors.price = form.price && Number(form.price) > 0 ? '' : 'Preço deve ser maior que 0.'
      errors.category = form.category ? '' : 'Categoria é obrigatória.'
      errors.imageUrl = form.imageUrl.trim() ? '' : 'URL da imagem é obrigatória.'

      return (
        !errors.name && !errors.description && !errors.price && !errors.category && !errors.imageUrl
      )
    }

    async function handleSubmit() {
      if (!validate()) {
        return
      }

      isSubmitting.value = true

      try {
        await dishesStore.createNewDish({
          name: form.name.trim(),
          description: form.description.trim(),
          price: Number(form.price),
          category: form.category,
          available: Boolean(form.available),
          imageUrl: form.imageUrl.trim(),
        })
        router.push('/')
      } catch (err) {
        console.error('Erro ao criar prato:', err)
      } finally {
        isSubmitting.value = false
      }
    }

    function handleCancel() {
      router.push('/')
    }

    return {
      categories,
      form,
      errors,
      isSubmitting,
      handleSubmit,
      handleCancel,
    }
  },
})
</script>

<template>
  <section>
    <header>
      <h2>Novo prato</h2>
      <p>Preencha o formulário para adicionar um prato ao menu.</p>
    </header>

    <form @submit.prevent="handleSubmit">
      <div>
        <label for="dish-name">Nome</label>
        <input id="dish-name" v-model="form.name" type="text" required />
        <p v-if="errors.name">{{ errors.name }}</p>
      </div>

      <div>
        <label for="dish-description">Descrição</label>
        <textarea id="dish-description" v-model="form.description" required></textarea>
        <p v-if="errors.description">{{ errors.description }}</p>
      </div>

      <div>
        <label for="dish-price">Preço (€)</label>
        <input
          id="dish-price"
          v-model.number="form.price"
          type="number"
          min="0"
          step="0.01"
          required
        />
        <p v-if="errors.price">{{ errors.price }}</p>
      </div>

      <div>
        <label for="dish-category">Categoria</label>
        <select id="dish-category" v-model="form.category" required>
          <option v-for="category in categories" :key="category.value" :value="category.value">
            {{ category.label }}
          </option>
        </select>
        <p v-if="errors.category">{{ errors.category }}</p>
      </div>

      <div>
        <label>
          <input v-model="form.available" type="checkbox" />
          Disponível
        </label>
      </div>

      <div>
        <label for="dish-image">URL da imagem</label>
        <input id="dish-image" v-model="form.imageUrl" type="text" required />
        <p v-if="errors.imageUrl">{{ errors.imageUrl }}</p>
      </div>

      <footer>
        <button type="submit" :disabled="isSubmitting">Criar</button>
        <button type="button" @click="handleCancel" :disabled="isSubmitting">Cancelar</button>
      </footer>
    </form>
  </section>
</template>

<style scoped>
#dish-description {
  resize: none;
}
</style>
