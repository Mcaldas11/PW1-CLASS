<template>
  <div>
    <StudentCard 
      v-for="student in students" 
      :key="student.studentNumber"
      :name="student.name"
      :student-number="student.studentNumber"
      :course="student.course"
      :year="student.year"
    />
  </div>
  
</template>

<script>
import StudentCard from './componentes/StudentCard.vue'
export default {
  name: 'App',
  components: {
    StudentCard,
  },
  data() {
    return {
      students: [
        {
          name: 'Alice Johnson',
          studentNumber: 123456,
          course: 'Computer Science',
          year: 2,
        },
        {
          name: 'Bob Smith',
          studentNumber: 234567,
          course: 'Information Systems',
          year: 1,
        },
        {
          name: 'Charlie Brown',
          studentNumber: 345678,
          course: 'Software Engineering',
          year: 3,
        },
      ],
    };
  },
}
</script>

<style lang="scss" scoped></style>
