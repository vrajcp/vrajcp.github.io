/* question bank */

const QUESTIONS = [
  {
    text: "Whose veterans had been settled on confiscated Italian land, leaving many of them bankrupt by the 60s BC?",
    choices: ["Sulla", "Marius", "Pompey", "Caesar"],
    correct: 0
  },
  {
    text: "Where was Pompey during most of 67–62 BC?",
    choices: ["Spain", "The East", "Gaul", "North Africa"],
    correct: 1
  },
  {
    text: "Before running for consul, Catiline had served as governor of what province?",
    choices: ["Sicily", "Spain", "Gaul", "Africa"],
    correct: 3
  },
  {
    text: "Autronius and Publius Cornelius Sulla were elected consul for 65 BC but then barred on what charge?",
    choices: ["Bribery", "Treason", "Murder", "Extortion"],
    correct: 0
  },
  {
    text: "Which two replacement consuls were the alleged target of the 66–65 BC plot?",
    choices: ["Silanus and Murena", "Cotta and Torquatus", "Marius and Sulla", "Crassus and Pompey"],
    correct: 1
  },
  {
    text: "According to some versions of the 66–65 BC plot, who would have become dictator?",
    choices: ["Catiline", "Autronius", "Caesar", "Crassus"],
    correct: 3
  },
  {
    text: "In the same versions, who was to be magister equitum?",
    choices: ["Caesar", "Cato", "Pompey", "Cicero"],
    correct: 0
  },
  {
    text: "Who was Catiline's running mate in the 64 BC consular election against Cicero?",
    choices: ["Quintus Curius", "Publius Lentulus", "Gaius Antonius", "Marcus Crassus"],
    correct: 2
  },
  {
    text: "Cicero was famously called a novus homo because",
    choices: [
      "he was the first of his family to reach the consulship",
      "he was a newly enrolled citizen",
      "he was a former slave",
      "he was the youngest senator"
    ],
    correct: 0
  },
  {
    text: "Which mistress of the conspirator Quintus Curius reportedly leaked plans to Cicero?",
    choices: ["Terentia", "Clodia", "Servilia", "Fulvia"],
    correct: 3
  },
  {
    text: "Which tribune proposed the major agrarian law that Cicero defeated in January 63 BC?",
    choices: ["Rullus", "Labienus", "Clodius", "Gracchus"],
    correct: 0
  },
  {
    text: "In spring 63 BC, Caesar used which tribune to challenge the legality of the Senatus Consultum Ultimum?",
    choices: ["Sulpicius", "Rullus", "Clodius", "Labienus"],
    correct: 3
  },
  {
    text: "The Rabirius prosecution concerned the legality of which decree?",
    choices: [
      "The Senatus Consultum Ultimum",
      "The Lex Iulia",
      "The Lex Rullia",
      "The Lex Plautia"
    ],
    correct: 0
  },
  {
    text: "Who defeated Catiline in the July 63 BC consular elections?",
    choices: [
      "Silanus and Murena",
      "Cotta and Torquatus",
      "Antonius and Crassus",
      "Hybrida and Lepidus"
    ],
    correct: 0
  },
  {
    text: "What did Cicero wear under his toga at the July 63 elections?",
    choices: ["A dagger", "A sword", "A breastplate", "A helmet"],
    correct: 2
  },
  {
    text: "Who mysteriously brought Cicero a packet of anonymous letters warning of a massacre in October 63?",
    choices: ["Caesar", "Cato", "Crassus", "Lucullus"],
    correct: 2
  },
  {
    text: "What Latin name is given to the emergency decree the Senate passed on October 21, 63 BC?",
    choices: [
      "Lex Sempronia",
      "Senatus Consultum Ultimum",
      "Interdictum Pompeianum",
      "Decretum Caesaris"
    ],
    correct: 1
  },
  {
    text: "Where did Manlius raise the revolt against Rome?",
    choices: ["Sicily", "Gaul", "Etruria", "Spain"],
    correct: 2
  },
  {
    text: "At whose house did Catiline meet the conspirators on the night of November 6th?",
    choices: ["Lentulus Sura", "Cethegus", "Quintus Curius", "Marcus Porcius Laeca"],
    correct: 3
  },
  {
    text: "Which two conspirators allegedly volunteered to murder Cicero at his morning salutatio?",
    choices: [
      "Vargunteius and Cornelius",
      "Lentulus and Cethegus",
      "Statilius and Gabinius",
      "Curius and Volturcius"
    ],
    correct: 0
  },
  {
    text: "In which temple did Cicero deliver the First Catilinarian Oration?",
    choices: [
      "Temple of Concord",
      "Temple of Vesta",
      "Temple of Jupiter Stator",
      "Temple of Saturn"
    ],
    correct: 2
  },
  {
    text: "What are the famous opening words of Cicero's First Catilinarian?",
    choices: [
      "Quo usque tandem abutere, Catilina, patientia nostra?",
      "Veni, vidi, vici.",
      "Tandem aliquando, Quirites, L. Catilinam",
      "Et tu, Brute?"
    ],
    correct: 0
  },
  {
    text: "Leaving Rome on the night of November 8, Catiline claimed to be going into exile where?",
    choices: ["Capua", "Carthage", "Syracuse", "Massilia"],
    correct: 3
  },
  {
    text: "Which Gallic envoys were intercepted at the Mulvian Bridge carrying signed letters from the conspirators?",
    choices: ["The Helvetii", "The Allobroges", "The Aedui", "The Arverni"],
    correct: 1
  },
  {
    text: "Which courier to Catiline turned state's evidence after the Mulvian Bridge ambush?",
    choices: ["Quintus Curius", "Publius Umbrenus", "Titus Volturcius", "Lucius Tarquinius"],
    correct: 2
  },
  {
    text: "Who was the Roman patron of the Allobroges who reported their approach to Cicero?",
    choices: ["Marcus Porcius Laeca", "Quintus Fabius Sanga", "Quintus Metellus", "Lucius Licinius Crassus"],
    correct: 1
  },
  {
    text: "In which temple did the Senate debate the fate of the conspirators on December 5th?",
    choices: [
      "Temple of Jupiter Stator",
      "Curia Julia",
      "Temple of Saturn",
      "Temple of Concord"
    ],
    correct: 3
  },
  {
    text: "Who proposed the death penalty for the arrested conspirators on December 5th?",
    choices: ["Caesar", "Cato", "Silanus", "Cicero"],
    correct: 2
  },
  {
    text: "Who proposed permanent imprisonment in Italian towns as an alternative to death?",
    choices: ["Cato", "Caesar", "Silanus", "Crassus"],
    correct: 1
  },
  {
    text: "Whose fiery speech on December 5th swung the Senate back toward the death penalty?",
    choices: ["Cato", "Cicero", "Silanus", "Caesar"],
    correct: 0
  },
  {
    text: "In which prison were the five conspirators strangled on the evening of December 5th?",
    choices: ["The Carcer Liberianus", "The Mamertine annex", "The Tullianum", "The Latomiae"],
    correct: 2
  },
  {
    text: "At what battle did Catiline die in January 62 BC?",
    choices: ["Pharsalus", "Pistoria", "Zama", "Cannae"],
    correct: 1
  },
  {
    text: "Between which two Roman commanders was Catiline trapped before his final battle?",
    choices: [
      "Marius and Sulla",
      "Pompey and Caesar",
      "Crassus and Lucullus",
      "Metellus Celer and Antonius"
    ],
    correct: 3
  },
  {
    text: "Why did Gaius Antonius, who was Catiline's ally, not personally command at Pistoria?",
    choices: [
      "He got gout",
      "He was recalled to Rome",
      "He had already resigned his command",
      "He was wounded in a previous skirmish"
    ],
    correct: 0
  },
  {
    text: "Who actually commanded Antonius' army at Pistoria?",
    choices: ["Marcus Petreius", "Marcus Crassus", "Quintus Metellus", "Gaius Julius Caesar"],
    correct: 0
  },
  {
    text: "What policy toward prisoners was followed at Pistoria?",
    choices: [
      "Ransom only",
      "Surrender accepted freely",
      "No prisoners taken",
      "Conditional clemency"
    ],
    correct: 2
  },
  {
    text: "Our two main contemporary narratives of the conspiracy are by",
    choices: [
      "Cicero and Sallust",
      "Livy and Tacitus",
      "Caesar and Suetonius",
      "Plutarch and Appian"
    ],
    correct: 0
  },
  {
    text: "Which later tribune exiled Cicero in 58 BC on the grounds that the December 5th executions had been illegal?",
    choices: ["Clodius", "Rullus", "Labienus", "Milo"],
    correct: 0
  },
  {
    text: "The conspirators' chief political slogan promised what?",
    choices: [
      "Cancellation of debts (tabulae novae)",
      "Distribution of grain",
      "Full citizenship for the Italians",
      "Abolition of the Senate"
    ],
    correct: 0
  }
];
