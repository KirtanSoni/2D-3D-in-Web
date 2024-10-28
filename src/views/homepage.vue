<script>
export default {
  name: 'Home',
  data() {
    return {
      // Define any reactive data here
    };
  },
  methods: {
    // Define any methods here
  },
  mounted() {
    // Code to run when the component is mounted
  },
};
</script>
<template>
    <div class="home">
        <header>
            <h1>Web in 3D</h1>
        </header>
        <main>
            <section>
                <h2>Learning outcomes</h2>
                <p>
                    Learning outcomes indicate what a learner should know by the end of the tutorial. They are often
                    expressed using
                    Bloom’s taxonomy and verbs. For example, “At the conclusion of this tutorial, the student should be
                    able to
                    compare and contrast the different types of web architectures”, or “the student will be able to
                    write a single-page
                    application using vanilla javascript”.
                    Students who do your tutorial should come away with a basic idea of the history, the problem
                    addressed, benefits
                    and challenges, future potential/directions, and basic implementation skills
                </p>
            </section>
            <section>
                <h2>Learning Activities</h2>
            <p>
A step-by-step set of learning activities designed to help the “student” achieve the learning outcomes  
This is the scripted part of the tutorial where you lead the student through content and interactive activities. One  
thing your tutorial should do is present information in the context of what you learn in SER421 (meaning tied to the  
concepts covered in class). You may augment your tutorial with short video and audio snippets but these are not a  
substitute for have step-by-step textual instructions

            </p>
            </section>
        </main>
        <footer>
        <p>Web in 3D</p>
        </footer>
    </div>
</template>
  

  
  <style scoped>
  .home {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  header {
    background-color: #f8f9fa;
    padding: 10px;
    text-align: center;
  }
  
  nav ul {
    list-style-type: none;
    padding: 0;
  }
  
  nav ul li {
    display: inline;
    margin: 0 10px;
  }
  
  footer {
    text-align: center;
    margin-top: 20px;
  }
  </style>
  