import { RandomDataGenerator } from 'src/helpers/random-data-generator/RandomDataGenerator';
import { TestDataReader } from '@utilities/reader-utils/JsonReader';
import { ActionUtils } from 'src/utilities/ActionUtils';
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

export interface HelperType extends TestDataType, ActionUtilsType {}