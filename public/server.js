// Set up a listener for the desired location
const ref = database.ref('users');
ref.on('child_added', (snapshot) => {
  const newData = snapshot.val();
  console.log('New data:', newData);
});