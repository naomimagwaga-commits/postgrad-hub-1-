/**
 * SPSS Basics · Lesson 1 — The SPSS Interface
 * Written for an anxious true beginner. Reassuring beginner-friendly voice.
 * Pacing: very slow, every term defined the first time used, no jargon without explanation.
 */

export const SPSS_INTERFACE_LESSON = {
  id: 'basics-1',
  title: 'The SPSS interface',
  subtitle: 'Module 03 · Course: SPSS Basics · Lesson 1 of 5',
  sections: [

    /* ════════════════════ 1. WELCOME ════════════════════ */
    {
      id: 'welcome',
      title: 'A gentle welcome',
      blocks: [
        { type: 'scene', body: [
          'You have just installed SPSS on your laptop. You double-click the icon. A grey grid opens with cells like an Excel spreadsheet — except the menus look unfamiliar, the buttons are tiny, and there is a feeling somewhere in your stomach that says: *"I have no idea what I am supposed to do here."*',
          'If that describes you right now — **you are exactly where every researcher started**. Including the ones who later published papers in international journals. SPSS looks intimidating the first time, the second time, and sometimes the tenth time. Then suddenly, one afternoon, it clicks. The goal of this lesson is to make that afternoon come sooner.',
          'We are going to take a slow, friendly tour of every part of the SPSS window. By the end you will know what each menu does, what each window is for, and where to click when you want to do something. We will not run any analyses yet — that comes in later lessons. Today is just about getting comfortable in the room.',
        ]},

        { type: 'callout', tone: 'gold', title: 'What you will be able to do after this lesson',
          body: [
            '**Open SPSS** and recognise every part of the screen without panic.',
            '**Name the four main windows** (Data Editor, Output Viewer, Syntax Editor, Chart Builder) and explain what each is for in one sentence.',
            '**Locate the eleven menus** along the top and have a rough sense of what lives behind each one.',
            '**Switch between Data View and Variable View** using the bottom tabs.',
            '**Find help** when SPSS does something confusing — including the official IBM help, the syntax reference, and the dataset properties.',
          ]},

        { type: 'why', body:
          'You cannot learn statistics through SPSS if every click feels like guessing. Time spent learning the interface is not "wasted" — it is the foundation on which every later lesson will sit. A pilot who has not yet memorised the cockpit cannot focus on flying the plane.' },
      ],
    },

    /* ════════════════════ 2. INSTALLING & OPENING ════════════════════ */
    {
      id: 'opening',
      title: 'Opening SPSS for the first time',
      blocks: [
        { type: 'heading', level: 2, text: 'Finding the icon and double-clicking it' },

        { type: 'paragraph', text:
          'Once SPSS is installed on your Windows laptop, you will see an icon that looks like a red square with the letters "SPSS" on it. There are three places it might be hiding:' },

        { type: 'list', items: [
          'On your **Desktop** — the icon usually appears there straight after installation. Double-click it.',
          'In your **Start Menu** — click the Windows icon in the bottom-left of your screen, then start typing "SPSS". The icon will appear at the top of the search results. Click it.',
          'In your **All Apps** list — Start menu → All apps → scroll down to "IBM SPSS Statistics".',
        ]},

        { type: 'callout', tone: 'info', title: 'Mac users',
          body: 'On a Mac, SPSS lives in your **Applications** folder. Open Finder → Applications → IBM SPSS Statistics → double-click. Everything else in this lesson works identically once SPSS is open.' },

        { type: 'heading', level: 3, text: 'The first thing you see — the welcome dialog' },

        { type: 'paragraph', text:
          'When SPSS opens, before showing you the main grid, it usually pops up a small **welcome dialog** asking what you want to do. This dialog is helpful the first few times you use SPSS, but quickly becomes annoying.' },

        { type: 'illustration', component: 'SpssStartScreen',
          caption: 'Figure 1. The SPSS welcome dialog that appears when you first launch SPSS. The three big buttons let you open an existing file, type new data, or run a saved query. For now we will simply close this dialog — but tick the "Don\'t show this dialog in the future" box (red arrow 1) if you find it annoying.' },

        { type: 'paragraph', text:
          'For this lesson, simply click **Cancel** in the bottom-right of the welcome dialog. This will take you straight to the main SPSS window with an empty grid ready to explore.' },

        { type: 'mistake',
          title: 'Panicking because the welcome dialog won\'t close',
          body: 'Many beginners click outside the dialog (which does nothing) and assume SPSS has frozen. The dialog is *modal* — it sits on top of the main window and blocks everything else until you respond to it.',
          fix: 'You must click one of the buttons inside the dialog: **OK**, **Cancel**, or one of the three big options. Cancel is the safest if you just want to see the main interface.' },

        { type: 'why', body:
          'Every modern program has these welcome dialogs (Microsoft Word does it, Excel does it). They exist to help new users. Once you know what you are doing, dismiss them and forget they exist. They are not part of SPSS itself — just a polite hand-shake.' },
      ],
    },

    /* ════════════════════ 3. THE MAIN WINDOW MAP ════════════════════ */
    {
      id: 'main-window-map',
      title: 'The big map — what every part of the screen is',
      blocks: [
        { type: 'heading', level: 2, text: 'A tour of the Data Editor window' },

        { type: 'paragraph', text:
          'After dismissing the welcome dialog, you are now staring at the main SPSS window. It is officially called the **Data Editor**. Even when it is empty (no data loaded), it has six important areas you should be able to point at. Let us walk through them one by one.' },

        { type: 'illustration', component: 'MachakosInterfaceMap',
          caption: 'Figure 2. The SPSS Data Editor with 5 color-coded callouts pointing to every essential area. 🟡 Gold = Menu Bar (11 menus). 🟢 Green = Toolbar (icon shortcuts). 🔵 Navy = Data View Grid (where your dataset lives — rows are respondents, columns are variables). 🔴 Coral = View Tabs (switch between Data View and Variable View). 🟣 Purple = Status Bar (tells you whether SPSS is ready or running). Refer back to this map whenever you feel lost — every SPSS window has these same 5 areas.' },

        { type: 'heading', level: 3, text: 'Area 1 — The title bar' },

        { type: 'paragraph', text:
          'The very top blue strip is the **title bar**. It tells you the name of the file you currently have open. When you first launch SPSS with no file loaded, it will say something like **"*Untitled1 [DataSet0] - IBM SPSS Statistics Data Editor"**. The asterisk (*) at the start means "this file has unsaved changes" — once you save, the asterisk disappears.' },

        { type: 'analogy', title: 'Like the tab in a web browser',
          body: 'The title bar in SPSS works exactly like the tab name in a web browser. It tells you which file you are looking at. If you have several SPSS files open at once (yes, you can), the title bar lets you tell them apart.' },

        { type: 'heading', level: 3, text: 'Area 2 — The menu bar' },

        { type: 'paragraph', text:
          'Just below the title bar runs the **menu bar** — a horizontal row of words: **File, Edit, View, Data, Transform, Analyze, Graphs, Utilities, Extensions, Window, Help**. These are eleven menus, and every single feature of SPSS lives somewhere inside one of them.' },

        { type: 'paragraph', text:
          'You do not need to memorise what is in each menu right now. The next section walks through each one. For now, just notice that all of SPSS\'s power is hidden behind these eleven simple words at the top of the screen.' },

        { type: 'heading', level: 3, text: 'Area 3 — The toolbar' },

        { type: 'paragraph', text:
          'Beneath the menu bar is a row of small **icons** — the toolbar. Each icon is a shortcut to a frequently-used command from the menus. The first icon (a folder shape) opens a file. The second (a disk) saves your current file. The third (a printer) prints. And so on.' },

        { type: 'callout', tone: 'info', title: 'Hover before you click',
          body: 'If you are not sure what a toolbar icon does, **hover your mouse over it for one second** and a small yellow tooltip will pop up telling you its name. This works for every icon in SPSS. Use it constantly — it is the fastest way to discover what each button does.' },

        { type: 'heading', level: 3, text: 'Area 4 — The data grid (the big empty space)' },

        { type: 'paragraph', text:
          'The huge empty grid taking up most of the window is where your **data** will live. It looks like an Excel spreadsheet. Each square (or *cell*) holds one piece of information. Right now it is empty because we have not loaded any data yet.' },

        { type: 'paragraph', text:
          'Importantly, this grid has **two faces** that you can switch between using the tabs at the bottom of the window (areas 5 and 6). One face shows the data values, the other shows the variable definitions. This is so important it gets its own lesson — Lesson 2.' },

        { type: 'heading', level: 3, text: 'Areas 5 and 6 — The Data View and Variable View tabs' },

        { type: 'paragraph', text:
          'At the very bottom-left of the SPSS window, you will see two small tabs: **Data View** (highlighted in white when active) and **Variable View**. Clicking these switches between the two faces of your dataset.' },

        { type: 'list', items: [
          '**Data View** — shows the actual values: each row is one person (or "case"), each column is one variable.',
          '**Variable View** — shows the *settings* for each variable: its name, its label, what kind of variable it is, how it should be displayed.',
        ]},

        { type: 'paragraph', text:
          'Try this right now if you have SPSS open: click **Variable View** at the bottom. The grid changes — instead of being mostly empty, you see eleven columns with headings like Name, Type, Width, Decimals, Label, Values, Missing… Now click **Data View** and the original empty grid returns. You are looking at the same (empty) dataset from two different angles.' },

        { type: 'reveal',
          prompt: 'Quick check — if I want to type in the value "78.5" for a pupil\'s mathematics score, which view should I switch to?',
          answer: '**Data View**. Data View is where actual values are entered. Variable View is for *defining* the variable (its name, label, type, etc.) — not for entering values.' },
      ],
    },

    /* ════════════════════ 4. THE 11 MENUS ════════════════════ */
    {
      id: 'menus',
      title: 'What every menu does',
      blocks: [
        { type: 'heading', level: 2, text: 'A one-line summary for each of the eleven menus' },

        { type: 'paragraph', text:
          'You do not need to remember every option inside every menu — there are hundreds of them and even seasoned researchers regularly forget where things live. What you DO need is a rough mental map: when you want to do something, which menu should you open first? Here is your map.' },

        { type: 'illustration', component: 'MachakosInterfaceMenuMap',
          caption: 'Figure 3. The 11 SPSS menus laid out as a printable cheat sheet. Each menu has a short description of what lives inside. The ⭐ **ANALYZE** menu is highlighted — you will spend most of your time there running statistical tests. The blue banner at the bottom names the three menus (DATA, TRANSFORM, ANALYZE) where 80% of everyday work happens. Bookmark this image.' },

        { type: 'comparison',
          headers: ['Menu', 'Use it when you want to…', 'Things hiding inside'],
          rows: [
            ['**File**',       'Open a file, save your work, print, or close SPSS.',                'Open Data, Save, Save As, Import Data (from Excel/CSV), Print, Recent Files, Exit'],
            ['**Edit**',       'Cut, copy, paste, undo, find-and-replace, or change SPSS settings.', 'Undo, Cut, Copy, Paste, Find, Replace, Options (very important for changing decimals etc.)'],
            ['**View**',       'Change what is visible on screen — fonts, gridlines, status bar.',   'Status Bar, Toolbars, Fonts, Grid Lines, Value Labels (toggle showing codes vs labels)'],
            ['**Data**',       'Modify the structure of your dataset — sort, split, weight cases.',  'Sort Cases, Select Cases, Split File, Weight Cases, Merge Files, Define Variable Properties'],
            ['**Transform**',  'Create new variables or recode existing ones.',                      'Compute Variable, Recode into Different Variables, Visual Binning, Rank Cases'],
            ['**Analyze**',    'Run any statistical analysis.',                                       'Descriptive Statistics, Compare Means (t-tests, ANOVA), Correlate, Regression, Scale (reliability)'],
            ['**Graphs**',     'Make charts and graphs.',                                             'Chart Builder (recommended), Legacy Dialogs (older menu), Bar, Pie, Histogram, Scatter'],
            ['**Utilities**',  'Look up information about your variables and datasets.',             'Variables (info pop-up), File Information, OMS Control Panel, Define Variable Sets'],
            ['**Extensions**', 'Install add-on features written by other researchers.',              'Extension Hub — most beginners never touch this menu'],
            ['**Window**',     'Switch between multiple SPSS windows you have open.',                'Minimize All, list of open windows, Reset Dialog Sizes'],
            ['**Help**',       'Get help — official IBM documentation, tutorials, syntax reference.', 'Topics, Tutorial, Algorithms, Statistics Coach, Command Syntax Reference'],
          ]},

        { type: 'callout', tone: 'gold', title: 'The three menus you will use 90% of the time',
          body: [
            '**File** — every time you open or save anything.',
            '**Analyze** — every time you run a statistical test.',
            '**Graphs** — every time you make a chart.',
            'The other eight exist, and you will visit them occasionally, but **File**, **Analyze**, and **Graphs** are your daily bread.',
          ]},

        { type: 'why', body:
          'Knowing this map saves you from clicking randomly when you need to do something. "I want to run a t-test" → Analyze. "I want to make a bar chart" → Graphs. "I want to save my work" → File. "I want to undo a mistake" → Edit. With this map in your head, you will never feel completely lost.' },

        { type: 'mistake',
          title: 'Looking for "Save" inside the toolbar when File menu is faster',
          body: 'Beginners often hunt the toolbar for ten seconds looking for the floppy-disk save icon. Meanwhile **File → Save** (or the keyboard shortcut **Ctrl+S**) is faster and works identically.',
          fix: 'When in doubt, go to the menu bar first. The toolbar is a *shortcut*, not the primary route. Once you know where things are in the menus, you can use the toolbar to save time.' },
      ],
    },

    /* ════════════════════ 5. KEYBOARD SHORTCUTS ════════════════════ */
    {
      id: 'keyboard',
      title: 'Keyboard shortcuts worth memorising',
      blocks: [
        { type: 'heading', level: 2, text: 'Half a dozen keystrokes that will save you hours' },

        { type: 'paragraph', text:
          'Every menu command in SPSS can be reached with the mouse — but the same commands are usually faster from the keyboard. You do not need to learn them all on day one, but the six below will save you visible amounts of time over the course of a thesis. They work in Data Editor, Output Viewer, and Syntax Editor.' },

        { type: 'comparison',
          headers: ['Shortcut', 'What it does', 'When you\'ll use it'],
          rows: [
            ['**Ctrl + S**',  'Save the current file',           'Every 5 minutes. Save often. Save religiously.'],
            ['**Ctrl + Z**',  'Undo your last action',           'When you make a mistake — and you will.'],
            ['**Ctrl + Y**',  'Redo (the opposite of undo)',     'When you over-undo and want to bring back a change.'],
            ['**Ctrl + C / V**','Copy / paste',                   'Moving values between cells or between SPSS and Word.'],
            ['**Ctrl + F**',  'Find a value or variable',        'When your dataset has 200 columns and you cannot scroll forever.'],
            ['**F1**',        'Open SPSS Help for whatever dialog you are in', 'When you don\'t know what an option means.'],
          ]},

        { type: 'callout', tone: 'warning', title: 'Save often. Save now. Save again.',
          body: 'SPSS does not have auto-save like Google Docs. If your laptop crashes, restarts unexpectedly, or runs out of battery, every unsaved change is lost. Make **Ctrl+S** a reflex. Every time you finish a small task — Ctrl+S. Every time you stand up to make tea — Ctrl+S. The five seconds you spend pressing Ctrl+S have saved more theses than any other habit on this list.' },
      ],
    },

    /* ════════════════════ 6. THE FOUR WINDOWS ════════════════════ */
    {
      id: 'four-windows',
      title: 'The four SPSS windows you should know',
      blocks: [
        { type: 'heading', level: 2, text: 'Data Editor is just one of four' },

        { type: 'paragraph', text:
          'The Data Editor we have been exploring is the window you spend most time in — but SPSS has **four** main types of window, and you will encounter all of them during your thesis. Knowing what each one is for stops you getting lost when SPSS suddenly opens a new window you weren\'t expecting.' },

        { type: 'illustration', component: 'MachakosInterfaceFourWindows',
          caption: 'Figure 4. The 4 SPSS windows shown side by side. 🟢 Data Editor (top-left) holds your dataset — 274 rows in the Machakos study. 🟡 Output Viewer (top-right) collects every table and chart from your analyses. 🔵 Syntax Editor (bottom-left) records analyses as reproducible code. 🟣 Chart Builder (bottom-right) is the drag-and-drop chart designer. The navy tip banner reminds you: 90% of your time is spent in Data Editor and Output Viewer — master those two first.' },

        { type: 'comparison',
          headers: ['Window', 'What it holds', 'When it opens'],
          rows: [
            ['**Data Editor**',    'Your dataset. The grid we have been looking at. Has Data View and Variable View tabs.',  'When you open SPSS or open a .sav file.'],
            ['**Output Viewer**',  'Everything SPSS prints in response to your analyses — tables, charts, logs of what you ran.', 'Automatically, the first time you run an analysis (Analyze → anything → OK).'],
            ['**Syntax Editor**',  'A text file of SPSS commands. The same analyses, but written as code you can re-run.',     'When you click **Paste** in any analysis dialog, or File → New → Syntax.'],
            ['**Chart Builder**',  'A drag-and-drop interface for designing charts.',                                          'When you choose Graphs → Chart Builder.'],
          ]},

        { type: 'heading', level: 3, text: 'How to move between windows' },

        { type: 'paragraph', text:
          'At any moment SPSS may have two, three, or even five windows open at once. They are listed at the bottom of the **Window** menu, and also (on Windows) on the taskbar at the very bottom of your screen. Click any window in either place to bring it to the front.' },

        { type: 'callout', tone: 'info', title: 'The most common confusion',
          body: [
            'You run an analysis and the result appears in the **Output Viewer** — a new window pops up in front. You glance at the result, then want to go back to your data and notice the data is gone.',
            'It is not gone. It is still in the **Data Editor** window — which is now *behind* the Output Viewer. Click the Window menu and select your data file by name to bring it back to the front. Both windows are open simultaneously; only one is on top at a time.',
          ]},

        { type: 'why', body:
          'This multi-window design is intentional. It lets you flip between looking at your data, looking at the results, and writing syntax to reproduce an analysis. It is awkward at first but powerful once you adjust. Most experienced SPSS users keep at least three windows open all the time.' },
      ],
    },

    /* ════════════════════ 7. SYNTAX EDITOR (gentle intro) ════════════════════ */
    {
      id: 'syntax',
      title: 'A gentle word about the Syntax Editor',
      blocks: [
        { type: 'heading', level: 2, text: 'Why you should care about syntax even on day one' },

        { type: 'paragraph', text:
          'When you run an analysis through the menus — say, **Analyze → Descriptive Statistics → Frequencies** — SPSS converts your clicks into a few lines of code behind the scenes. That code is called **syntax**. You can see it, copy it, save it, and re-run it later.' },

        { type: 'paragraph', text:
          'Most beginners ignore syntax because it looks scary. We are going to mention it now, very briefly, and ask you to be aware it exists — even if you don\'t use it on day one. Here is why.' },

        { type: 'callout', tone: 'gold', title: 'Three reasons every serious researcher uses syntax',
          body: [
            '**It is reproducible.** Six months from now, when your examiner asks "how exactly did you compute that variable?", a syntax file shows them the exact commands. Memory and screenshots are not enough.',
            '**It is fast.** Once you have written ten lines of syntax that clean your data, you can re-run them on an updated dataset in two seconds. Without syntax, you would re-click everything by hand.',
            '**It is what every published methodology requires.** Journals and serious supervisors expect you to keep a syntax log of your analyses. "I clicked through the menus" is not an acceptable methodology section.',
          ]},

        { type: 'heading', level: 3, text: 'How to get SPSS to show you the syntax it is running' },

        { type: 'steps', steps: [
          { title: 'Open any analysis dialog', body: 'For example: Analyze → Descriptive Statistics → Frequencies.' },
          { title: 'Set up the analysis as normal', body: 'Move variables across, pick options, etc.' },
          { title: 'Click PASTE instead of OK', body: 'You will see a new window open — the **Syntax Editor** — with the exact code that would have run if you had clicked OK. You can read it, save it, or run it later.' },
          { title: 'Run the syntax', body: 'In the Syntax Editor, highlight the lines you want to run and click the green play button (▶). The analysis runs exactly as if you had clicked OK.' },
        ]},

        { type: 'paragraph', text:
          'You do not have to do this yet. But for every important analysis in your thesis, get into the habit of clicking **Paste** instead of OK. Save the syntax. Six months from now you will thank yourself.' },

        { type: 'analogy', title: 'Like a recipe',
          body: 'Imagine baking a cake by improvising — you taste, you adjust, you produce something delicious. Then someone asks: "Can you make that exact cake again?" If you wrote the recipe down as you went, the answer is yes. If you didn\'t, the answer is "I\'ll try". SPSS syntax is the recipe. The menu clicks are the improvising.' },
      ],
    },

    /* ════════════════════ 8. SETTINGS YOU SHOULD CHANGE ON DAY ONE ════════════════════ */
    {
      id: 'options',
      title: 'Three settings to change on day one',
      blocks: [
        { type: 'heading', level: 2, text: 'A small one-time investment that pays off forever' },

        { type: 'paragraph', text:
          'SPSS ships with default settings that suit some researchers and infuriate others. Three of them are worth changing the very first time you open SPSS, because they will save you frustration on every single analysis afterwards. Open **Edit → Options** and follow along.' },

        { type: 'steps', steps: [
          { title: 'Set the default number of decimal places',
            body: [
              'In Options, click the **Data** tab. Look for "Display Format for New Numeric Variables".',
              'Change **Decimal Places** from 2 to **3**. This means new variables you create show three decimal places by default — usually more useful for statistical work than two.',
              'You can always change this for individual variables later in Variable View.',
            ]},
          { title: 'Show variable LABELS instead of variable names in dialogs',
            body: [
              'Click the **General** tab. Find the section "Output". Under "Pivot Table Labeling" choose **Labels** rather than Names. Under "Variables in Dialogs" choose **Display labels**.',
              'Why this matters: variable names are short and cryptic ("q4_sa1_rev"). Labels are human-readable ("Q4 — satisfaction reverse-coded"). With labels showing in dialogs, you will not have to look up what every cryptic name means.',
            ]},
          { title: 'Tell SPSS where to save files by default',
            body: [
              'In the **File Locations** tab, set "Last folder used" or pick a fixed folder (e.g. **Documents → SPSS work**).',
              'This means every time you open or save a file, SPSS opens the folder where your thesis data lives — no more navigating from C: every single time.',
            ]},
        ]},

        { type: 'callout', tone: 'success', title: 'After changing options',
          body: 'Click **OK** to save. The changes take effect immediately for all future work. They do not change anything in files you have already created — so existing variables keep their existing decimal places, etc. They only apply to NEW work from here on.' },
      ],
    },

    /* ════════════════════ 9. WHEN SOMETHING GOES WRONG ════════════════════ */
    {
      id: 'troubleshooting',
      title: 'When something goes wrong — getting help',
      blocks: [
        { type: 'heading', level: 2, text: 'Three places to go when SPSS confuses you' },

        { type: 'paragraph', text:
          'No matter how much you learn, SPSS will sometimes do something you did not expect. A dialog will have an option you have never seen. An output table will have a column you cannot interpret. A red error message will appear in the syntax editor. This is normal. Here is what to do, in order.' },

        { type: 'steps', steps: [
          { title: 'Press F1 — built-in help',
            body: [
              'The F1 key opens the **SPSS Help system** for whatever dialog or window you currently have focused. If you are in the Regression dialog and press F1, it opens the help page for Regression. If you are looking at an output table and press F1, it opens the help page for that table.',
              'The help pages are dense but accurate — they explain every option and every column. If you only learn one shortcut from this lesson, learn F1.',
            ]},
          { title: 'Use the menu Help → Topics or Help → Tutorial',
            body: 'The Tutorials menu walks you through common analyses step-by-step with example data. They are slow but trustworthy. Better than YouTube videos of unknown quality.' },
          { title: 'Search the IBM SPSS documentation online',
            body: 'Google "IBM SPSS Statistics [topic]" and the first result is usually the official IBM documentation. This is the same content as the F1 help but in a browser. Always trust this over random forum answers.' },
        ]},

        { type: 'callout', tone: 'warning', title: 'A word about random YouTube tutorials',
          body: 'There are thousands of SPSS tutorials on YouTube. Some are excellent (Andy Field, university stats departments). Many are wrong, outdated, or made by people who do not understand statistics. When you watch a tutorial, ask: does the presenter explain *why*, or only *click here, click there*? If only the second, find another video.' },

        { type: 'mistake',
          title: 'Closing the error message without reading it',
          body: 'When SPSS shows a red error message, beginners often click "OK" reflexively and try the analysis again. The error message contains the exact reason your analysis failed.',
          fix: 'Always READ the error before dismissing it. Often it says something simple: "Variable X is type String — cannot compute mean". Now you know the fix: convert X to numeric.' },
      ],
    },

    /* ════════════════════ 9.5 MEET THE MACHAKOS DATA (the recurring case study) ════════════════════ */
    {
      id: 'meet-machakos',
      title: 'Meet the Machakos data — the study that runs through every lesson',
      blocks: [
        { type: 'callout', tone: 'gold', title: 'Why this section exists',
          body: [
            'From this lesson onwards, every SPSS Basics and Descriptive/Correlation lesson uses the SAME real-world case study — a Kenyan postgraduate research project. This gives you consistency: instead of a different toy dataset every lesson, you follow ONE study from start to finish.',
            'This section introduces the study so that when you see "Digital_Devices" or "Math_KCSE_Mean" mentioned in later lessons, you already know what those variables are and why they matter.',
          ]},

        { type: 'heading', level: 2, text: 'The study — one paragraph' },

        { type: 'paragraph', text:
          'A Kenyan postgraduate researcher wanted to know whether digital learning resources (devices, teacher training, internet connectivity, per-student investment) actually IMPROVE Mathematics performance in Machakos County secondary schools. She collected data from **274 respondents across 8 schools**: 8 principals, 54 teachers, and 212 students (Form 2, 3, and 4). Everyone completed the same Likert-scale questionnaire; the students also had their Mathematics KCSE mean scores recorded.' },

        { type: 'heading', level: 2, text: 'What the dataset looks like when loaded in SPSS' },

        { type: 'illustration', component: 'MachakosInterfaceMachakosLoaded',
          caption: 'Figure 6. The Machakos_Study.sav dataset opened in the SPSS Data Editor. Each ROW is one respondent (274 in total). Each COLUMN is one variable (21 in total). Notice the icons next to each column name — 🔴 red circles mean String (like Category or Gender), 📏 yellow rulers mean Scale/continuous (like Age or Math_KCSE_Mean), 📊 bar-chart icons mean Ordinal (like Form). You will learn to read these icons at a glance in Lesson 3. Status bar at the bottom-right confirms: Cases 274, Variables 21.' },

        { type: 'comparison',
          headers: ['Variable group', 'Example variables', 'What they measure'],
          rows: [
            ['**Identifiers**',            'RespID, SchoolID',                       'Unique respondent ID and their school code (S01–S08)'],
            ['**Demographics**',           'Category, Gender, Age, Form, HighestQual', 'Who each respondent is. Note: Form (2/3/4) only applies to students; HighestQual only applies to teachers/principals.'],
            ['**Digital-devices Likert (5 items)**',  'Dev_1 to Dev_5',              'Individual questionnaire responses about device availability (1=Strongly disagree to 5=Strongly agree)'],
            ['**Teacher-competency Likert (5 items)**',  'Comp_1 to Comp_5',         'Individual responses about teacher digital-skills training'],
            ['**Internet-connectivity Likert (5 items)**', 'Net_1 to Net_5',         'Individual responses about network reliability'],
            ['**Composite scores** (computed in Data Cleaning lesson)',  'Digital_Devices, Teacher_Competency, Internet_Connectivity', 'The 5-item Likert groups averaged into single continuous variables'],
            ['**Financial variable**',     'InvestmentPerStudent',                    'KES spent per student per year on digital resources (M ≈ KES 4,820)'],
            ['**The dependent variable**', 'Math_KCSE_Mean',                          'The outcome we\'re trying to predict — student Math KCSE mean score (M ≈ 5.92 out of a max ~8)'],
          ]},

        { type: 'callout', tone: 'info', title: 'You don\'t need to memorise this now',
          body: [
            'Bookmark this section. Every time a later lesson mentions "Digital_Devices" or "InvestmentPerStudent" you can pop back here to remember what it is.',
            'The point is not to memorise 21 variable names today — it is to know that WHENEVER you see the same variable names reappearing across lessons, they refer to this same Machakos dataset.',
          ]},

        { type: 'why', body:
          'Real thesis work uses one study, one dataset, followed all the way through. This platform mirrors that — so by the time you finish the entire SPSS Academy, you will have effectively "done" one full Chapter 4 for a real Kenyan case study. That skill transfers directly to YOUR own data.' },
      ],
    },

    /* ════════════════════ 10. SECTION SUMMARY ════════════════════ */
    {
      id: 'summary',
      title: 'Lesson summary',
      blocks: [
        { type: 'heading', level: 2, text: 'What you should now be able to do' },

        { type: 'summary', items: [
          'Open SPSS and recognise that the welcome dialog is just a polite hand-shake — click Cancel to get to the main window.',
          'Identify the six key areas of the Data Editor: title bar, menu bar, toolbar, data grid, Data View tab, Variable View tab.',
          'Switch between Data View (the values) and Variable View (the definitions) using the bottom tabs.',
          'Find your way around the eleven menus — and know that **File**, **Analyze**, and **Graphs** are the three you will use 90% of the time.',
          'Use the six essential keyboard shortcuts, especially **Ctrl+S** to save (your future self will thank you).',
          'Recognise the four kinds of SPSS window — Data Editor, Output Viewer, Syntax Editor, Chart Builder — and switch between them via the Window menu.',
          'Click **Paste** instead of OK in any analysis dialog to capture the underlying syntax — the recipe of your analysis.',
          'Change three first-day settings in Edit → Options: default decimals to 3, show variable labels in dialogs, set default folder.',
          'Press **F1** for context-sensitive help whenever a dialog confuses you.',
        ]},

        { type: 'callout', tone: 'gold', title: 'Up next',
          body: 'In **Lesson 2: Data View vs. Variable View** we dive into the most-confused topic in all of SPSS — the difference between the two faces of your dataset. By the end of Lesson 2 you will know exactly which view to be in for any task, and you will have set up your first proper variable from scratch.' },

        { type: 'paragraph', text:
          'Before you move on: open SPSS on your laptop right now (if you have it installed). Click around. Open every menu. Hover over every toolbar icon. Switch between Data View and Variable View. The familiarity you build today is the foundation everything else sits on. Then come back for the knowledge check.' },
      ],
    },

    /* ════════════════════ 11. KNOWLEDGE CHECK ════════════════════ */
    {
      id: 'knowledge-check',
      title: 'Knowledge check',
      blocks: [
        { type: 'heading', level: 2, text: 'Five quick questions' },

        { type: 'paragraph', text:
          'Answer all five questions to complete the lesson. After each answer you will see whether you were right plus a brief explanation. You can retry as many times as you want.' },

        { type: 'check',
          question: 'Which menu do you open to run a statistical test (e.g. a t-test or correlation)?',
          choices: ['File', 'Data', 'Analyze', 'Utilities'],
          answer: 2,
          explanation: 'The **Analyze** menu is where every statistical test lives — t-tests, ANOVA, regression, correlation, reliability, factor analysis, the lot. **File** is for opening and saving. **Data** is for restructuring the dataset. **Utilities** is for inspecting variable information.' },

        { type: 'check',
          question: 'You ran a Frequencies analysis and now you cannot find your data — only a table of results is showing. What happened?',
          choices: [
            'SPSS deleted the data',
            'The Output Viewer window opened in front; your data is still in the Data Editor window — switch via the Window menu',
            'You need to re-open the file',
            'The data is corrupted',
          ],
          answer: 1,
          explanation: 'This is the most common beginner confusion. When you run an analysis, SPSS opens the **Output Viewer** window with the results — and that new window appears in front. Your data is still safe in the **Data Editor** window behind it. Use the **Window** menu to switch back.' },

        { type: 'check',
          question: 'You want SPSS to remember the exact analysis you ran today so you can re-run it next week. What should you do?',
          choices: [
            'Take a screenshot of every dialog',
            'Click **Paste** instead of OK in the analysis dialog to capture the syntax, then save the syntax file',
            'Write the steps down on paper',
            'Just remember the menus you clicked',
          ],
          answer: 1,
          explanation: 'Clicking **Paste** captures the exact SPSS syntax (the recipe) into a new Syntax Editor window. Save that file (Ctrl+S) and you can re-run the same analysis any time in the future. Screenshots and notes are not reproducible the way syntax is.' },

        { type: 'check',
          question: 'You are typing data and notice the cells in the grid look greyed out — you cannot enter a value. What is most likely wrong?',
          choices: [
            'SPSS is frozen',
            'You are on the **Variable View** tab; switch to **Data View** to enter values',
            'You need to reinstall SPSS',
            'Your dataset is read-only',
          ],
          answer: 1,
          explanation: 'Variable View is for defining variable settings (name, label, type, etc.), not for entering data values. To type in actual values you must switch to **Data View** using the tab at the bottom-left of the window.' },

        { type: 'check',
          question: 'What does the keyboard shortcut **Ctrl+S** do?',
          choices: [
            'Switches to syntax',
            'Saves the current file',
            'Selects all',
            'Searches for a variable',
          ],
          answer: 1,
          explanation: '**Ctrl+S** saves whatever file you currently have open — Data Editor, Output Viewer, or Syntax Editor. Use it constantly. SPSS has no auto-save.' },
      ],
    },
  ],
};
