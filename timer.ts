/**
 * Play chime.mp3 every 5 minutes 10 seconds before the
 * time elapses.
 *
 * The browser was so finnicky about this, and it only
 * just occurred to me that this was a trivial shell
 * script.
 *
 * Chime was taken from pixabay, and can be played in
 * the posix terminal like so:
 *
 *   ffplay ./chime.mp3 -autoexit -nodisp
 *
 * To run this script, install bun https://bun.sh/, then
 * run:
 *
 *   bun ./timer.ts
 *
 * What's the use of this, you ask? I'm trading the 5
 * minute futures chart, and this alerts me when a bar
 * is 10 seconds from closing, which is when I generally
 * make my trading decisions.
 */
import { $ } from 'bun';

// await $`ffplay ./chime.mp3 -autoexit -nodisp`.quiet();
async function run() {
  let playing = false;
  let prev = `0:00`;

  async function play() {
    if (playing) {
      return;
    }
    playing = true;
    await $`ffplay ./chime.mp3 -autoexit -nodisp`.quiet();
    playing = false;
  }

  while (true) {
    const secs = Math.floor(Date.now() / 1000);
    const mins = Math.floor(secs / 60);
    const secsLeft = 60 - (secs % 60) - 1;
    const minsLeft = 5 - (mins % 5) - 1;
    const time = `${minsLeft}:${secsLeft.toString().padStart(2, '0')}`;
    if (time !== prev) {
      prev = time;
      process.stdout.write('\033[2J\r'); // Clear the current line
      console.log(`5 min timer: ${time}`);
      if (time === '0:10') {
        play();
      }
    }
    await Bun.sleep(250);
  }
}

run();

