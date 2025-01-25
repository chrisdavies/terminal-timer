/**
 * Play chime.mp3 every 5 minutes 10 seconds before the
 * time elapses.
 */
import { $ } from 'bun';

async function run() {
  let playing = false;

  async function play() {
    try {
      if (!playing) {
        playing = true;
        await $`ffplay ./chime.mp3 -autoexit -nodisp`.quiet();
        playing = false;
      }
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }

  while (true) {
    const now = Date.now();
    const secs = Math.floor(now / 1000);
    const mins = Math.floor(secs / 60);
    const secsLeft = 60 - (secs % 60) - 1;
    const minsLeft = 5 - (mins % 5) - 1;
    const time = `${minsLeft}:${secsLeft.toString().padStart(2, '0')}`;
    process.stdout.write(`\033[2K\r5 min timer: ${time}`);
    if (time === '0:10') {
      play();
    }
    await Bun.sleep(1000 - (now % 1000));
  }
}

run();

