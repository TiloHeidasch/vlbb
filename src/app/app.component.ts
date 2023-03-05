import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MitarbeiterDialogComponent } from './mitarbeiter-dialog/mitarbeiter-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  verfuegbarkeitDisplayedColumns: string[] = [
    'Name',
    'Mo',
    'Di',
    'Mi',
    'Do',
    'Fr',
    'Sa',
    'So',
    'Edit',
    'Delete',
  ];
  dataSource: Mitarbeiter[];
  schichtDisplayedColumns: string[] = [
    'Name',
    'Mo',
    'Di',
    'Mi',
    'Do',
    'Fr',
    'Sa',
    'So',
    'Anzahl',
  ];
  mitarbeiterListe: Mitarbeiter[];
  constructor(
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    const storedVal = localStorage.getItem('mitarbeiterListe');
    if (storedVal) {
      this.mitarbeiterListe = JSON.parse(storedVal);
    } else {
      this.mitarbeiterListe = [];
    }
    this.dataSource = this.mitarbeiterListe;
  }

  openCreateDialog(): void {
    const dialogRefCreate = this.dialog.open(MitarbeiterDialogComponent, {
      data: {
        id: uuidv4(),
        mitarbeiterName: '',
        tagverfuegbarkeit: {
          mo: 'OKAY',
          di: 'OKAY',
          mi: 'OKAY',
          do: 'OKAY',
          fr: 'OKAY',
          sa: 'OKAY',
          so: 'OKAY',
        },
        tagSchicht: {
          mo: 'NEIN',
          di: 'NEIN',
          mi: 'NEIN',
          do: 'NEIN',
          fr: 'NEIN',
          sa: 'NEIN',
          so: 'NEIN',
        },
        tagSchichtZwang: {
          mo: 'NEIN',
          di: 'NEIN',
          mi: 'NEIN',
          do: 'NEIN',
          fr: 'NEIN',
          sa: 'NEIN',
          so: 'NEIN',
        },
        tagSchichtAnzahl: 0,
        tagSchichtZwangAnzahl: 0,
      },
    });

    dialogRefCreate.afterClosed().subscribe((mitarbeiter) => {
      this.mitarbeiterListe.push(mitarbeiter);
      this.berechneBeide();
    });
  }
  openEditDialog(mitarbeiter: Mitarbeiter): void {
    const dialogRefEdit = this.dialog.open(MitarbeiterDialogComponent, {
      data: mitarbeiter,
    });

    dialogRefEdit.afterClosed().subscribe((mitarbeiter) => {

      this.mitarbeiterListe[mitarbeiter.id] = mitarbeiter;
      this.berechneBeide();
    });
  }
  deleteMitarbeiter(mitarbeiter: Mitarbeiter) {
    this.mitarbeiterListe = this.mitarbeiterListe.filter(
      (othermitarbeiter) => othermitarbeiter.id !== mitarbeiter.id
    );
    this.berechneBeide();
  }
  updateMitarbeiter() {
    this.dataSource = this.mitarbeiterListe;
    localStorage.setItem(
      'mitarbeiterListe',
      JSON.stringify(this.mitarbeiterListe)
    );
    this.changeDetectorRefs.detectChanges();
  }
  berechneBeide() {
    const plan = this.berechnePlan(false);
    const zwangPlan = this.berechnePlan(true);
    this.mapPlan(plan, zwangPlan);
  }
  mapPlan(plan: string[], zwangPlan: string[]) {
    for (
      let mitarbeiterIndex = 0;
      mitarbeiterIndex < this.mitarbeiterListe.length;
      mitarbeiterIndex++
    ) {
      const mitarbeiter = this.mitarbeiterListe[mitarbeiterIndex];
      let planAnzahl = 0;
      if (plan[0].search(mitarbeiter.mitarbeiterName) > -1) {
        mitarbeiter.tagSchicht.mo = 'JA';
        planAnzahl = planAnzahl + 1;
      } else {
        mitarbeiter.tagSchicht.mo = 'NEIN';
      }
      if (plan[1].search(mitarbeiter.mitarbeiterName) > -1) {
        mitarbeiter.tagSchicht.di = 'JA';
        planAnzahl = planAnzahl + 1;
      } else {
        mitarbeiter.tagSchicht.di = 'NEIN';
      }
      if (plan[2].search(mitarbeiter.mitarbeiterName) > -1) {
        mitarbeiter.tagSchicht.mi = 'JA';
        planAnzahl = planAnzahl + 1;
      } else {
        mitarbeiter.tagSchicht.mi = 'NEIN';
      }
      if (plan[3].search(mitarbeiter.mitarbeiterName) > -1) {
        mitarbeiter.tagSchicht.do = 'JA';
        planAnzahl = planAnzahl + 1;
      } else {
        mitarbeiter.tagSchicht.do = 'NEIN';
      }
      if (plan[4].search(mitarbeiter.mitarbeiterName) > -1) {
        mitarbeiter.tagSchicht.fr = 'JA';
        planAnzahl = planAnzahl + 1;
      } else {
        mitarbeiter.tagSchicht.fr = 'NEIN';
      }
      if (plan[5].search(mitarbeiter.mitarbeiterName) > -1) {
        mitarbeiter.tagSchicht.sa = 'JA';
        planAnzahl = planAnzahl + 1;
      } else {
        mitarbeiter.tagSchicht.sa = 'NEIN';
      }
      if (plan[6].search(mitarbeiter.mitarbeiterName) > -1) {
        mitarbeiter.tagSchicht.so = 'JA';
        planAnzahl = planAnzahl + 1;
      } else {
        mitarbeiter.tagSchicht.so = 'NEIN';
      }
      mitarbeiter.tagSchichtAnzahl = planAnzahl;
      let zwangPlanAnzahl = 0;
      if (zwangPlan[0].search(mitarbeiter.mitarbeiterName) > -1) {
        mitarbeiter.tagSchichtZwang.mo = 'JA';
        zwangPlanAnzahl = zwangPlanAnzahl + 1;
      } else {
        mitarbeiter.tagSchichtZwang.mo = 'NEIN';
      }
      if (zwangPlan[1].search(mitarbeiter.mitarbeiterName) > -1) {
        mitarbeiter.tagSchichtZwang.di = 'JA';
        zwangPlanAnzahl = zwangPlanAnzahl + 1;
      } else {
        mitarbeiter.tagSchichtZwang.di = 'NEIN';
      }
      if (zwangPlan[2].search(mitarbeiter.mitarbeiterName) > -1) {
        mitarbeiter.tagSchichtZwang.mi = 'JA';
        zwangPlanAnzahl = zwangPlanAnzahl + 1;
      } else {
        mitarbeiter.tagSchichtZwang.mi = 'NEIN';
      }
      if (zwangPlan[3].search(mitarbeiter.mitarbeiterName) > -1) {
        mitarbeiter.tagSchichtZwang.do = 'JA';
        zwangPlanAnzahl = zwangPlanAnzahl + 1;
      } else {
        mitarbeiter.tagSchichtZwang.do = 'NEIN';
      }
      if (zwangPlan[4].search(mitarbeiter.mitarbeiterName) > -1) {
        mitarbeiter.tagSchichtZwang.fr = 'JA';
        zwangPlanAnzahl = zwangPlanAnzahl + 1;
      } else {
        mitarbeiter.tagSchichtZwang.fr = 'NEIN';
      }
      if (zwangPlan[5].search(mitarbeiter.mitarbeiterName) > -1) {
        mitarbeiter.tagSchichtZwang.sa = 'JA';
        zwangPlanAnzahl = zwangPlanAnzahl + 1;
      } else {
        mitarbeiter.tagSchichtZwang.sa = 'NEIN';
      }
      if (zwangPlan[6].search(mitarbeiter.mitarbeiterName) > -1) {
        mitarbeiter.tagSchichtZwang.so = 'JA';
        zwangPlanAnzahl = zwangPlanAnzahl + 1;
      } else {
        mitarbeiter.tagSchichtZwang.so = 'NEIN';
      }
      mitarbeiter.tagSchichtAnzahl = zwangPlanAnzahl;
      this.mitarbeiterListe[mitarbeiter.id] = mitarbeiter;
    }
    this.updateMitarbeiter();
  }
  berechnePlan(zwang: boolean) {
    const moeglichePlaeneMo = this.getMoeglichePlaene('mo', zwang);
    const moeglichePlaeneDi = this.getMoeglichePlaene('di', zwang);
    const moeglichePlaeneMi = this.getMoeglichePlaene('mi', zwang);
    const moeglichePlaeneDo = this.getMoeglichePlaene('do', zwang);
    const moeglichePlaeneFr = this.getMoeglichePlaene('fr', zwang);
    const moeglichePlaeneSa = this.getMoeglichePlaene('sa', zwang);
    const moeglichePlaeneSo = this.getMoeglichePlaene('so', zwang);
    const randomPlan: string[] = [];
    randomPlan.push(
      moeglichePlaeneMo[
        this.randomIntFromInterval(0, moeglichePlaeneMo.length - 1)
      ]
    );
    randomPlan.push(
      moeglichePlaeneDi[
        this.randomIntFromInterval(0, moeglichePlaeneDi.length - 1)
      ]
    );
    randomPlan.push(
      moeglichePlaeneMi[
        this.randomIntFromInterval(0, moeglichePlaeneMi.length - 1)
      ]
    );
    randomPlan.push(
      moeglichePlaeneDo[
        this.randomIntFromInterval(0, moeglichePlaeneDo.length - 1)
      ]
    );
    randomPlan.push(
      moeglichePlaeneFr[
        this.randomIntFromInterval(0, moeglichePlaeneFr.length - 1)
      ]
    );
    randomPlan.push(
      moeglichePlaeneSa[
        this.randomIntFromInterval(0, moeglichePlaeneSa.length - 1)
      ]
    );
    randomPlan.push(
      moeglichePlaeneSo[
        this.randomIntFromInterval(0, moeglichePlaeneSo.length - 1)
      ]
    );

    const bestPlan = this.berechneBestenPlan(
      moeglichePlaeneMo,
      moeglichePlaeneDi,
      moeglichePlaeneMi,
      moeglichePlaeneDo,
      moeglichePlaeneFr,
      moeglichePlaeneSa,
      moeglichePlaeneSo,
      randomPlan
    );
    return bestPlan;
  }
  copyPlan(planToCopy: string[]): string[] {
    const copy: string[] = [];
    planToCopy.forEach((planItemToCopy) => {
      copy.push(planItemToCopy + '');
    });
    return copy;
  }
  berechneBestenPlan(
    moeglichePlaeneMo: string[],
    moeglichePlaeneDi: string[],
    moeglichePlaeneMi: string[],
    moeglichePlaeneDo: string[],
    moeglichePlaeneFr: string[],
    moeglichePlaeneSa: string[],
    moeglichePlaeneSo: string[],
    bisherigerBester: string[]
  ): string[] {
    const backupPlan = this.copyPlan(bisherigerBester);
    let newPlan: string[] = [];
    try {
      for (let dayindex = 0; dayindex < 7; dayindex++) {
        newPlan = this.copyPlan(backupPlan);
        let moeglichePlaene: string[] = [];
        switch (dayindex) {
          case 0:
            moeglichePlaene = moeglichePlaeneMo;
            break;
          case 1:
            moeglichePlaene = moeglichePlaeneDi;
            break;
          case 2:
            moeglichePlaene = moeglichePlaeneMi;
            break;
          case 3:
            moeglichePlaene = moeglichePlaeneDo;
            break;
          case 4:
            moeglichePlaene = moeglichePlaeneFr;
            break;
          case 5:
            moeglichePlaene = moeglichePlaeneSa;
            break;
          case 6:
            moeglichePlaene = moeglichePlaeneSo;
            break;
        }
        let max = moeglichePlaene.length;
        for (let index = 0; index < max; index++) {
          const dayValue = moeglichePlaene[index];
          newPlan[dayindex] = dayValue;

          const planOld =
            '' +
            backupPlan[0] +
            backupPlan[1] +
            backupPlan[2] +
            backupPlan[3] +
            backupPlan[4] +
            backupPlan[5] +
            backupPlan[6];
          const planNew =
            '' +
            newPlan[0] +
            newPlan[1] +
            newPlan[2] +
            newPlan[3] +
            newPlan[4] +
            newPlan[5] +
            newPlan[6];
          const occurencesOld: any[] = [];
          const occurencesNew: any[] = [];
          this.mitarbeiterListe.forEach((mitarbeiter) => {
            const name = mitarbeiter.mitarbeiterName;
            if (name !== '') {
              occurencesOld.push(this.occurrences(planOld, name));
              occurencesNew.push(this.occurrences(planNew, name));
            }
          });

          const bandbreiteAlt =
            Math.max(...occurencesOld) - Math.min(...occurencesOld);
          const bandbreiteNeu =
            Math.max(...occurencesNew) - Math.min(...occurencesNew);
          const wennmussAlt = this.occurrences(planOld, '(');
          const wennmussNeu = this.occurrences(planNew, '(');
          const medAvgDeltaAlt = Math.abs(
            median(occurencesOld) - average(occurencesOld)
          );
          const medAvgDeltaNeu = Math.abs(
            median(occurencesNew) - average(occurencesNew)
          );
          const firstQuartDistAlt = Math.abs(
            median(occurencesOld) - quantile(occurencesOld, 0.25)
          );
          const firstQuartDistNeu = Math.abs(
            median(occurencesNew) - quantile(occurencesNew, 0.25)
          );
          const thirdQuartDistAlt = Math.abs(
            median(occurencesOld) - quantile(occurencesOld, 0.75)
          );
          const thirdQuartDistNeu = Math.abs(
            median(occurencesNew) - quantile(occurencesNew, 0.75)
          );
          const bandbreiteEval = bandbreiteNeu < bandbreiteAlt;
          const bandbreiteSame = bandbreiteNeu === bandbreiteAlt;
          const wennMussEval = wennmussNeu < wennmussAlt;
          const wennMussSame = wennmussNeu === wennmussAlt;
          const medAvgDeltaEval = medAvgDeltaNeu < medAvgDeltaAlt;
          const medAvgDeltaSame = medAvgDeltaNeu === medAvgDeltaAlt;
          const firstQuartDistEval = firstQuartDistNeu < firstQuartDistAlt;
          const firstQuartDistSame = firstQuartDistNeu === firstQuartDistAlt;
          const thirdQuartDistEval = thirdQuartDistNeu < thirdQuartDistAlt;
          const thirdQuartDistSame = thirdQuartDistNeu === thirdQuartDistAlt;
          const evals =
            bandbreiteEval ||
            (bandbreiteSame && wennMussEval) ||
            (bandbreiteSame && wennMussSame && medAvgDeltaEval) ||
            (bandbreiteSame &&
              wennMussSame &&
              medAvgDeltaSame &&
              firstQuartDistEval) ||
            (bandbreiteSame &&
              wennMussSame &&
              medAvgDeltaSame &&
              firstQuartDistSame &&
              thirdQuartDistEval);
          if (evals) {
            throw new Error('foundNewPlan');
          }
        }
      }
    } catch (error) {
      try {
        return this.berechneBestenPlan(
          moeglichePlaeneMo,
          moeglichePlaeneDi,
          moeglichePlaeneMi,
          moeglichePlaeneDo,
          moeglichePlaeneFr,
          moeglichePlaeneSa,
          moeglichePlaeneSo,
          newPlan
        );
      } catch (error) {
        return newPlan;
      }
    }
    return newPlan;
  }
  randomIntFromInterval(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  getMoeglichePlaene(tag: string, zwang: boolean): string[] {
    const moeglichePlaene = [];
    const anzahlKombinatorik = Math.pow(2, this.mitarbeiterListe.length);
    const maxBin = (anzahlKombinatorik - 1).toString(2);
    for (let index = 0; index < anzahlKombinatorik; index++) {
      const binDirty = index.toString(2);
      let bin = '';
      for (let count = 0; count < maxBin.length - binDirty.length; count++) {
        bin = bin + '0';
      }
      bin = bin + binDirty;
      const amountOfOnes = bin.length - bin.replaceAll('1', '').length;
      try {
        if (amountOfOnes === 3) {
          let plan = '';
          for (let index2 = 0; index2 < bin.length; index2++) {
            const binEl = bin.substring(index2, index2 + 1);
            if (binEl === '1') {
              let verfuegbarkeit = '';
              const mitarbeiter = this.mitarbeiterListe[index2];
              switch (tag) {
                case 'mo':
                  verfuegbarkeit = mitarbeiter.tagverfuegbarkeit.mo;
                  break;
                case 'di':
                  verfuegbarkeit = mitarbeiter.tagverfuegbarkeit.di;
                  break;
                case 'mi':
                  verfuegbarkeit = mitarbeiter.tagverfuegbarkeit.mi;
                  break;
                case 'do':
                  verfuegbarkeit = mitarbeiter.tagverfuegbarkeit.do;
                  break;
                case 'fr':
                  verfuegbarkeit = mitarbeiter.tagverfuegbarkeit.fr;
                  break;
                case 'sa':
                  verfuegbarkeit = mitarbeiter.tagverfuegbarkeit.sa;
                  break;
                case 'so':
                  verfuegbarkeit = mitarbeiter.tagverfuegbarkeit.so;
                  break;
                default:
                  break;
              }
              if (verfuegbarkeit === 'VLLT' || verfuegbarkeit === 'NEIN') {
                throw new Error('Nicht verfügbar');
              }
              if (!zwang && verfuegbarkeit === 'GEHT') {
                throw new Error('Nicht verfügbar');
              }
              plan = plan + mitarbeiter.mitarbeiterName + ',';
            }
          }
          moeglichePlaene.push(plan);
        }
      } catch (error) {}
    }
    return moeglichePlaene;
  }
  occurrences(
    string: string,
    subString: string,
    allowOverlapping?: boolean
  ): number {
    string += '';
    subString += '';
    if (subString.length <= 0) return string.length + 1;

    var n = 0,
      pos = 0,
      step = allowOverlapping ? 1 : subString.length;

    while (true) {
      pos = string.indexOf(subString, pos);
      if (pos >= 0) {
        ++n;
        pos += step;
      } else break;
    }
    return n;
  }
}

export interface Mitarbeiter {
  id: number;
  mitarbeiterName: string;
  tagverfuegbarkeit: Tage;
  tagSchicht: Tage;
  tagSchichtAnzahl: number;
  tagSchichtZwang: Tage;
  tagSchichtZwangAnzahl: number;
}
export interface Tage {
  mo: string;
  di: string;
  mi: string;
  do: string;
  fr: string;
  sa: string;
  so: string;
}
function median(values: number[]): number {
  if (values.length === 0) throw new Error('No inputs');

  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}
const average = (array: number[]) =>
  array.reduce((a, b) => a + b) / array.length;
const quantile = (arr: number[], q: number) => {
  const sorted = asc(arr);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
    return sorted[base];
  }
};
const asc = (arr: number[]) => arr.sort((a, b) => a - b);

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

const mean = (arr: number[]) => sum(arr) / arr.length;

// sample standard deviation
const std = (arr: number[]) => {
  const mu = mean(arr);
  const diffArr = arr.map((a) => (a - mu) ** 2);
  return Math.sqrt(sum(diffArr) / (arr.length - 1));
};
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
