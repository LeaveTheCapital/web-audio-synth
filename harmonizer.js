/*
when a midi note is received, we will start to build up a collection of notes to see if pattern can be inferred. 
After n notes, we will start to play harmony notes
We will keep listening for further notes or changes of key, always listening for the last m notes... 
allowing some tolerance and if a note outside of the key is played regularly we will learn from that individual case

to start all we need is an array of all the main key signatures
and choose how many we want to match before we make an educated guess on the key

then think about what harmony note we will play.. start by always playing a major 3rd/fourth / next note close to that

and introduce a little bit of randomness so that occasionally notes will not be played

also, respond differently to chords being played versus single notes

*/

const cMajorScale = ["C", "D", "E", "F", "G", "A", "B"];
