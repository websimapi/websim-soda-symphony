const lyrics = [
    { text: "Psshhhht! Psshhhht!", action: "open", duration: 1500 },
    { text: "Glug glug glug…", action: "drink", duration: 1500 },
    { text: "Ahhh! Ahhh!", action: "fizz", duration: 1000 },
    { text: "Clap… slap… clap…", action: "clap", duration: 1500 },
    { text: "", action: "pause", duration: 500 },
    
    { text: "Psshhhht! Psshhhht!", action: "open", duration: 1500 },
    { text: "Glug glug glug…", action: "drink", duration: 1500 },
    { text: "Ahhh! Ahhh!", action: "fizz", duration: 1000 },
    { text: "Clap… snap… clap…", action: "clap", duration: 1500 },
    { text: "", action: "pause", duration: 800 },
    
    // Chorus
    { text: "Psshhhht! Glug glug glug!", action: "open-drink", duration: 2000 },
    { text: "Ahhh! Ahhh!", action: "fizz", duration: 1000 },
    { text: "Clap… slap… clap…", action: "clap", duration: 1500 },
    { text: "Fizz, gulp, ahhh, snap!", action: "combo", duration: 2000 },
    { text: "Psshhhht! Glug glug glug!", action: "open-drink", duration: 2000 },
    { text: "Ahhh! Ahhh!", action: "fizz", duration: 1000 },
    { text: "Clap… slap… clap…", action: "clap", duration: 1500 },
    { text: "Drink it down, let it pop!", action: "combo", duration: 2000 },
    { text: "", action: "pause", duration: 800 },
    
    // Verse 2
    { text: "Fizz fizz fizz…", action: "fizz", duration: 1500 },
    { text: "Psshhhht!", action: "open", duration: 800 },
    { text: "Glug glug glug…", action: "drink", duration: 1500 },
    { text: "Ahhh!", action: "fizz", duration: 800 },
    { text: "Clap… slap… clap…", action: "clap", duration: 1500 },
    { text: "Ssshh… pop… gulp… ahhh!", action: "combo", duration: 2000 },
    { text: "Psshhhht! Glug glug…", action: "open-drink", duration: 1800 },
    { text: "Ahhh! Clap… clap… clap…", action: "clap", duration: 1500 },
    { text: "", action: "pause", duration: 800 },
    
    // Bridge
    { text: "Pshhh… glug… ahhh…", action: "open-drink", duration: 2000 },
    { text: "Pop! Pop! Pop!", action: "clap", duration: 1200 },
    { text: "Clap… snap… ssshh…", action: "clap", duration: 1500 },
    { text: "Ahhh… fizz… glug…", action: "fizz", duration: 1500 },
    { text: "Psshhhht! Glug glug! Ahhh!", action: "combo", duration: 2000 },
    { text: "Clap… clap… clap…", action: "clap", duration: 1500 },
    { text: "", action: "pause", duration: 800 },
    
    // Chorus repeat
    { text: "Psshhhht! Glug glug glug!", action: "open-drink", duration: 2000 },
    { text: "Ahhh! Ahhh!", action: "fizz", duration: 1000 },
    { text: "Clap… slap… clap…", action: "clap", duration: 1500 },
    { text: "Fizz, gulp, ahhh, snap!", action: "combo", duration: 2000 },
    { text: "Psshhhht! Glug glug glug!", action: "open-drink", duration: 2000 },
    { text: "Ahhh! Ahhh!", action: "fizz", duration: 1000 },
    { text: "Clap… slap… clap…", action: "clap", duration: 1500 },
    { text: "Drink it down, let it pop!", action: "combo", duration: 2000 }
];

const lyricsDiv = document.getElementById('lyrics');
const sodaCan = document.getElementById('sodaCan');
const fizz = document.getElementById('fizz');
const playButton = document.getElementById('playButton');
const buttonText = document.getElementById('buttonText');

let isPlaying = false;
let currentTimeout;

function performAction(action) {
    sodaCan.className = 'soda-can';
    fizz.className = 'fizz';
    
    switch(action) {
        case 'open':
            sodaCan.classList.add('can-open');
            break;
        case 'drink':
            sodaCan.classList.add('can-drink');
            break;
        case 'fizz':
            fizz.classList.add('active');
            break;
        case 'clap':
            sodaCan.classList.add('can-clap');
            break;
        case 'open-drink':
            sodaCan.classList.add('can-open');
            setTimeout(() => {
                sodaCan.classList.remove('can-open');
                sodaCan.classList.add('can-drink');
            }, 500);
            break;
        case 'combo':
            fizz.classList.add('active');
            sodaCan.classList.add('can-clap');
            setTimeout(() => {
                sodaCan.classList.remove('can-clap');
                sodaCan.classList.add('can-drink');
            }, 800);
            break;
    }
}

async function playSong() {
    isPlaying = true;
    playButton.disabled = true;
    buttonText.textContent = 'Playing...';
    
    for (let i = 0; i < lyrics.length; i++) {
        const line = lyrics[i];
        
        if (line.text) {
            lyricsDiv.textContent = line.text;
            lyricsDiv.classList.add('show');
        } else {
            lyricsDiv.classList.remove('show');
        }
        
        performAction(line.action);
        
        await new Promise(resolve => {
            currentTimeout = setTimeout(resolve, line.duration);
        });
        
        if (!isPlaying) break;
    }
    
    lyricsDiv.classList.remove('show');
    isPlaying = false;
    playButton.disabled = false;
    buttonText.textContent = 'Play Again';
}

playButton.addEventListener('click', () => {
    if (!isPlaying) {
        playSong();
    }
});

