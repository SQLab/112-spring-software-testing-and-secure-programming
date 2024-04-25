Name: 陳履安
ID: 511559023

### Fuzz Monitor
```
            american fuzzy lop ++4.00c {default} (./bmpcomp) [fast]
┌─ process timing ────────────────────────────────────┬─ overall results ────┐
│        run time : 0 days, 0 hrs, 27 min, 9 sec      │  cycles done : 2     │
│   last new find : 0 days, 0 hrs, 15 min, 46 sec     │ corpus count : 23    │
│last saved crash : 0 days, 0 hrs, 27 min, 6 sec      │saved crashes : 1     │
│ last saved hang : 0 days, 0 hrs, 26 min, 59 sec     │  saved hangs : 2     │
├─ cycle progress ─────────────────────┬─ map coverage┴──────────────────────┤
│  now processing : 1.17 (4.3%)        │    map density : 13.79% / 65.52%    │
│  runs timed out : 0 (0.00%)          │ count coverage : 18.89 bits/tuple   │
├─ stage progress ─────────────────────┼─ findings in depth ─────────────────┤
│  now trying : splice 11              │ favored items : 3 (13.04%)          │
│ stage execs : 10/12 (83.33%)         │  new edges on : 4 (17.39%)          │
│ total execs : 27.0k                  │ total crashes : 7280 (1 saved)      │
│  exec speed : 7.39/sec (zzzz...)     │  total tmouts : 3691 (7 saved)      │
├─ fuzzing strategy yields ────────────┴─────────────┬─ item geometry ───────┤
│   bit flips : disabled (default, enable with -D)   │    levels : 5         │
│  byte flips : disabled (default, enable with -D)   │   pending : 15        │
│ arithmetics : disabled (default, enable with -D)   │  pend fav : 0         │
│  known ints : disabled (default, enable with -D)   │ own finds : 22        │
│  dictionary : n/a                                  │  imported : 0         │
│havoc/splice : 22/11.2k, 1/15.5k                    │ stability : 100.00%   │
│py/custom/rq : unused, unused, unused, unused       ├───────────────────────┘
│    trim/eff : 99.42%/69, disabled                  │          [cpu000: 12%]
└────────────────────────────────────────────────────┘

```

### Run Crash Result
```
File: id:000001,sig:11,src:000000,op:havoc,rep:2
Description: The application crashed due to a buffer overflow when processing the input from the test case. The crash was accompanied by a segmentation fault.
Address: 0x00401337 (Possible buffer overflow detected)
```
