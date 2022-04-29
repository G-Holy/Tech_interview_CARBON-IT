import { Injectable } from '@nestjs/common';
import {
  Adventurer,
  AdventurerReport,
  CommandFlag,
  DATA_SEPARATOR,
  Map,
  MapReport,
  MountainReport,
  Report,
  ReportData,
  TreasuresReport,
} from '@treasure-hunt/adventure/core';

@Injectable()
export class ReportFormatterProvider {
  public getSimulationReport(map: Map, adventurers: Adventurer[]) {
    const mapReport = this.formatMapReport(map);
    const mountainReports = this.formatMoutainReports(map);
    const treasuresReports = this.formatTreasureReports(map);
    const adventurerReport = this.formatAllAdventurersReport(adventurers);

    const simulationReport = [
      mapReport,
      ...mountainReports,
      ...treasuresReports,
      ...adventurerReport,
    ];

    return this.formatReportFileContent(simulationReport);
  }

  private formatReportFileContent(simulationReport: Report[]) {
    return simulationReport.reduce(
      (reportFileContent, report) =>
        reportFileContent + this.formatReportLine(report),
      ''
    );
  }

  private formatAllAdventurersReport(
    adventurers: Adventurer[]
  ): AdventurerReport[] {
    return adventurers.reduce((report, adventurer) => {
      const adventurerReport = this.formatOneAdventurerReport(adventurer);
      report.push(adventurerReport);
      return report;
    }, [] as AdventurerReport[]);
  }

  private formatOneAdventurerReport(adventurer: Adventurer): AdventurerReport {
    const { position, direction } = adventurer.getGeolocation();
    const treasureCount = adventurer.getTreasuresCount();
    const name = adventurer.name;

    return [
      CommandFlag.ADVENTURER,
      name,
      position.x,
      position.y,
      direction,
      treasureCount,
    ];
  }

  private formatMapReport(map: Map): MapReport {
    const { length, height } = map.sizeCopy;
    return [CommandFlag.MAP, length, height];
  }

  private formatMoutainReports(map: Map): MountainReport[] {
    const mountainscell = map.mountainsCopy;
    const mountainsReport = mountainscell.reduce((report, mountain) => {
      const { x, y } = mountain.position;
      report.push([CommandFlag.MOUNTAIN, x, y]);
      return report;
    }, [] as MountainReport[]);

    return mountainsReport;
  }

  private formatTreasureReports(map: Map): TreasuresReport[] {
    const treasuresCell = map.treasuresCopy;
    const treasuresReport = treasuresCell.reduce((report, cell) => {
      const { x, y } = cell.position;
      const treasuresCount = cell.count;

      if (treasuresCount > 0) {
        report.push([CommandFlag.TREASURE, x, y, treasuresCount]);
      }
      return report;
    }, [] as TreasuresReport[]);

    return treasuresReport;
  }

  private formatReportLine(reportLineData: ReportData[]) {
    const reportLine = reportLineData.reduce((line, data) => {
      const isFirstData = line === '';
      return line + `${isFirstData ? '' : DATA_SEPARATOR}` + `${data}`;
    }, '');
    return reportLine + '\n';
  }
}
