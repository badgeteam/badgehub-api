export interface SemanticVersionRangeRelation {
  semantic_version_range_id: number;
}

export interface SemanticVersionRange {
  id: number;
  semantic_version_range: string; // Semantic version range specification that allows tilde, caret, wildcard specification of the version of a project that should be used. Following what is described here: https://python-poetry.org/docs/dependency-specification/
}
