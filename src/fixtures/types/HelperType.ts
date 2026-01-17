import { RandomDataGenerator } from 'src/helpers/random-data-generator/RandomDataGenerator';
import { TestDataReader } from '@utilities/reader-utils/JsonReader';
import { ActionUtils } from 'src/utilities/ActionUtils';
import { StudentFormSteps } from '@helpers/ui-reusable-steps/Forms/StudentFormSteps';
import { StringUtils } from '@utilities/StringUtils';

export interface TestDataType {
  randomDataGenerator: RandomDataGenerator;
  jsonReader: TestDataReader;
}

export interface ActionUtilsType {
  actionUtils: ActionUtils;
}

export interface StringUtilsType {
  stringUtils: StringUtils;
}

export interface StepHelperType {
  studentFormSteps: StudentFormSteps;
}

export interface HelperType extends TestDataType, ActionUtilsType, StepHelperType {}
