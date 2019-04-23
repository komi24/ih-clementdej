// mise en place de la strtucture , on crée une array avec 52 semaines_P 
let semaines_P = [];
for (let i = 0; i < 53; i++) {
  semaines_P.push(i);
}

// on crée les colonnes du tableaux 
let columns_P = [{ title: "Projet" }]
for (let i = 1; i < semaines_P.length; i++) {
  columns_P.push({ title: `Week ${i}` })
}
// console.log('colonne', columns); ok ca marche 





document.addEventListener('DOMContentLoaded', () => {
  console.log('IronGenerator JS imported successfully!');

  // promise de tout recupérer 
  Promise.all([axios.get('/api/projects'), axios.get('/api/dashboard')])

    .then(([project, cal]) => {
      var dataSet = [];
      let projects = project.data.map(e => e.title)
      console.log('array pojetc', projects)


      for (let index = 0; index < projects.length; index++) {

        //ajoute le nom du USER en debut de l'array 
        dataSet.push([`${projects[index]}`])

        // on filtre tout le travail pour un USER 
        let oneProject = cal.data.calendar.filter(e => e.project.title === projects[index])
        console.log('test de la loop pour ' + projects[index])
        console.log(oneProject)

        // Loop pour chaque week ajouter un string à DATASET [USER][0, .... -> 52]
        for (let i = 1; i <= 52; i++) {

          let oneweek = oneProject.filter(e => e.week === i)
          let times = 0
          if (oneweek.length > 0) {
            oneweek.forEach(e => times += e.time)
            console.log('times for ' + i + ' ' + times)
          }
          dataSet[index][i] = times.toFixed(1) + ':D'
        }

      }

      console.log(dataSet);
      $('#dash2').DataTable({
        data: dataSet,
        columns: columns_P,
      })

    })



}, false);
