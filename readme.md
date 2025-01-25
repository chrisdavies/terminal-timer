# Timer

Use bun to play a chime in the terminal every 5 minutes.


Play chime.mp3 (obtained from [pixabay](https://pixabay.com/)) every 5 minutes, 10 seconds before the
time elapses.

This relies on a posix shell and ffplay:

```bash
ffplay ./chime.mp3 -autoexit -nodisp
```

To run this script, [install bun](https://bun.sh/), then run:

```bash
bun ./timer.ts
```

What's the use of this, you ask? I'm trading the 5 minute futures chart, and this alerts me when a bar is 10 seconds from closing, which is when I generally make my trading decisions.

