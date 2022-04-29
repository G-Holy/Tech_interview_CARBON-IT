import { BadRequestException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  AdventurerCommand,
  CardinalDirection,
  Command,
  CommandFlag,
  deepCopyObject,
  MapCommand,
} from '@treasure-hunt/adventure/core';
import { AdventureInterpreterService } from '../adventure-interpreter.service';
import { CommandInterpreterProvider } from '../command-interpreter.provider';
import { SimulationReportProvider } from '../simulation-report.provider';
import { SimulationRunnerProvider } from '../simulation-runner.provider';

/* Fakes */
const mapCommandFake = {
  type: CommandFlag.MAP,
  size: {
    length: 4,
    height: 5,
  },
} as MapCommand;

const kate: AdventurerCommand = {
  type: CommandFlag.ADVENTURER,
  name: 'larah',
  position: { x: 0, y: 3 },
  direction: CardinalDirection.SOUTH,
  movementSequence: [],
};

const john: AdventurerCommand = {
  type: CommandFlag.ADVENTURER,
  name: 'john',
  position: { x: 0, y: 0 },
  direction: CardinalDirection.NORTH,
  movementSequence: [],
};

describe('adventure interpreter service', () => {
  let service: AdventureInterpreterService;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AdventureInterpreterService,

        /* Dependencies */

        CommandInterpreterProvider,
        SimulationRunnerProvider,
        SimulationReportProvider,
      ],
    }).compile();

    service = await testingModule.resolve<AdventureInterpreterService>(
      AdventureInterpreterService
    );
  });

  it('AdventureInterpreterService should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Return a valid report', () => {
    it('Should return a valid report when called with just one commandMap', () => {
      const report = service.interpreteSimulation([mapCommandFake]);
      expect(report).toBeDefined();
      expect(report).toBe('C - 4 - 5\n');
    });

    it('Should return a valid report when called with multiple adventurers', () => {
      const report = service.interpreteSimulation([mapCommandFake, kate, john]);
      expect(report).toBeDefined();

      const lines = report.split('\n');
      const linesNumber = lines.filter((line) => line !== '').length;
      expect(linesNumber).toBe(3);
    });
  });

  describe('Should throw an HttpException', () => {
    it('When commands is empty', () => {
      expect(() => service.interpreteSimulation([])).toThrowError(
        HttpException
      );
    });

    it('When more than one mapCommand provided', () => {
      expect(() =>
        service.interpreteSimulation([mapCommandFake, mapCommandFake])
      ).toThrowError(HttpException);
    });

    it('when two adventurers start at the same position', () => {
      expect(() =>
        service.interpreteSimulation([
          mapCommandFake,
          kate,
          { ...kate, name: 'hurlay' },
        ])
      ).toThrowError(HttpException);
    });
  });
});
