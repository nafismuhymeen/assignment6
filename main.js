const apiUrl = 'https://api.lyrics.ovh'; 
const result = document.getElementById("search-result");
const empty = '   dfsdf   ';


function searchSong () {
    fetch (`${apiUrl}/suggest/${document.getElementById("songSearchBar").value}`)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        var songList = data.data;
        showData(songList)
    })}

    function showData(data) {
        if ($('#search-result').children().length == 0){
            for (let i = 0; i < 10; i++) {
                result.innerHTML +=`<div  class="song-card single-result row align-items-center my-3 p-3">
                         <div class="col-md-9">
                             <h3 class="lyrics-name">${data[i].title}</h3>
                             <p class="author lead">by <span>${data[i].artist.name}</span></p>
                             <audio src=${data[i].preview} controls></audio>
                         </div>
                         <div class="col-md-3 text-md-right text-center">
                            <button class="btn btn-success" data-artist="${data[i].artist.name}" data-songtitle="${data[i].title}">Get Lyrics</button>
                         </div>
                     </div>`
                    }
        }
        else{
            result.innerHTML = '';
            for (let i = 0; i < 10; i++) {
                result.innerHTML +=`<div  class="song-card single-result row align-items-center my-3 p-3">
                         <div class="col-md-9">
                             <h3 class="lyrics-name">${data[i].title}</h3>
                             <p class="author lead">by <span>${data[i].artist.name}</span></p>
                         </div>
                         <div class="col-md-3 text-md-right text-center">
                            <button class="btn btn-success" data-artist="${data[i].artist.name}" data-songtitle="${data[i].title}">Get Lyrics</button>
                         </div>
                     </div>`
                    }

        }
       
    }
 
    result.addEventListener('click', e => {
        const clickedEl = e.target;
      
        if (clickedEl.tagName === 'BUTTON') {
          const artist = clickedEl.getAttribute('data-artist');
          const songTitle = clickedEl.getAttribute('data-songtitle');
      
          lyrics(artist, songTitle);
        }
      });


      function lyrics(artist, songTitle) {
          fetch(`${apiUrl}/v1/${artist}/${songTitle}`)
          .then(res => res.json())
          .then(data =>{ console.log(data);
              if (data.error) {
                result.innerHTML = data.error;
              }
              else {
                result.innerHTML = `<div class="single-lyrics text-center">
                <h2 class="text-success mb-4">${songTitle} - ${artist}</h2>
                <pre class="lyric text-white">
                    ${data.lyrics}
                </pre>
            </div>`;
          }
          })
      }