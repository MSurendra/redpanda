import {CoprocessorHandle} from "../domain/CoprocessorManager";
import {find} from "../utilities/Map";

/**
 * CoprocessorsRepository is a container for CoprocessorHandles.
 */
class CoprocessorRepository {
  constructor(folder: string) {
    this.folder = folder
    this.coprocessors = new Map()
  }

  /**
   * this method adds a new CoprocessorHandle to the repository
   * @param coprocessor
   */
  add(coprocessor: CoprocessorHandle): void {
    this.coprocessors.set(coprocessor.coprocessor.globalId, coprocessor)
  }

  /**
   *
   * findByGlobalId method receives a coprocessor and returns a CoprocessorHandle if
   * there exists one with the same global ID as the given coprocessor. Returns
   * undefined otherwise.
   * @param coprocessor
   */
  findByGlobalId = (coprocessor: CoprocessorHandle): CoprocessorHandle | undefined => {
    const coprocessorFound = find(this.coprocessors, ((key, value) =>
      coprocessor.coprocessor.globalId === value.coprocessor.globalId))
    return coprocessorFound ? coprocessorFound[1] : undefined
  }

  /**
   * removeCoprocessor method remove a coprocessor from the coprocessor map
   * @param coprocessor
   */
  remove = (coprocessor: CoprocessorHandle): boolean =>
    this.coprocessors.delete(coprocessor.coprocessor.globalId)
  
  /**
   * getCoprocessors returns the map of CoprocessorHandles indexed by their global ID
   */
  getCoprocessors = () => this.coprocessors

  private readonly folder
  private readonly coprocessors: Map<number, CoprocessorHandle>;
}

export default CoprocessorRepository