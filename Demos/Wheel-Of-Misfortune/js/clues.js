// Add clues here, make sure your clue length does not expand past the widgth of the board!
clueBank =[
{category:'Movies' , clue:'hocus pocus'},
{category:'Movies' , clue:'rosemarys baby'},
{category:'Movies' , clue:'poltergeist'},
{category:'Movies' , clue:'beetlejuice'},
{category:'Movies' , clue:'childs play'},
{category:'Movies' , clue:'a quiet place'},
{category:'Movies' , clue:'hereditary'},
{category:'Movies' , clue:'death becomes her'},
{category:'Movies' , clue:'the conjuring'},
{category:'Serial Killers' , clue:'ted bundy'},
{category:'Serial Killers' , clue:'zodiac killer'},
{category:'Serial Killers' , clue:'monster of florence'},
{category:'Serial Killers' , clue:'jeffrey dahmer'},
{category:'Serial Killers' , clue:'john wayne gacy'},
{category:'Serial Killers' , clue:'devon heathcote'},
{category:'Serial Killers' , clue:'jack the ripper'},
{category:'Serial Killers' , clue:'ted bundy'},
{category:'Serial Killers' , clue:'ted bundy'},
{category:'Around the Killing Room' , clue:'needle nose plyers'},
{category:'Around the Killing Room' , clue:'chain saw'},
{category:'Around the Killing Room' , clue:'torture chamber'},
{category:'Around the Killing Room' , clue:'sledge hammer'},
{category:'Around the Killing Room' , clue:'sharp axe'},
{category:'Around the Killing Room' , clue:'glass shards'},
{category:'Famous Ghosts' , clue:'king hamlet'},
{category:'Famous Ghosts' , clue:'the flying dutchman'},
{category:'Famous Ghosts' , clue:'the bell witch'},
{category:'Famous Ghosts' , clue:'casper'},
{category:'Famous Ghosts' , clue:'bloody mary'},
{category:'Famous Ghosts' , clue:'the drury lane ghost'},
{category:'Famous Ghosts' , clue:'the vanishing hitchhiker'},
{category:'Famous Ghosts' , clue:'the ghost of christmas past'},
{category:'Famous Ghosts' , clue:'slimer'}
]

// Get Random Clue
clueBank.getRandClue = function () {
  var max = this.length
  var min = 0
  randI = Math.floor(Math.random() * (max - min)) + min
  var category = this[randI].category
  var clue = this[randI].clue
  clueBank.splice(randI,1)
  return [category, clue]
}