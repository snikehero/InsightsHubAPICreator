import { useMemo, useState } from "react";
import type { AspectTypePayload, AspectVariable } from "../lib/aspect-types";
import { DEFAULT_ASPECT, DATA_TYPES } from "../lib/aspect-types";
import "./../styles/CreateAspectType.css";
function VarRow({
  idx,
  value,
  onChange,
}: {
  idx: number;
  value: AspectVariable;
  onChange: (next: AspectVariable) => void;
}) {
  return (
    
    <div className="card" aria-label={`Variable ${idx + 1}`}>
      <div className="grid2">
        <label>
          <span>Name</span>
          <input
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
            placeholder={`VAR_${idx + 1}`}
          />
        </label>
        <label>
          <span>Data type</span>
          <select
            value={value.dataType}
            onChange={(e) => onChange({ ...value, dataType: e.target.value as any })}
          >
            {DATA_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Unit</span>
          <input
            value={value.unit}
            onChange={(e) => onChange({ ...value, unit: e.target.value })}
            placeholder="MW, Volt, °C, etc"
          />
        </label>
        <div className="row gap" style={{ alignItems: "end" }}>
          <label className="f row">
            <input
              type="checkbox"
              checked={value.qualityCode}
              onChange={(e) => onChange({ ...value, qualityCode: e.target.checked })}
            />
            <span>qualityCode</span>
          </label>
          <label className="f row">
            <input
              type="checkbox"
              checked={value.searchable}
              onChange={(e) => onChange({ ...value, searchable: e.target.checked })}
            />
            <span>searchable</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default function CreateAspectType() {
  const [model, setModel] = useState<AspectTypePayload>({ ...DEFAULT_ASPECT });
  const [varCount, setVarCount] = useState<number>(2);
  const [preview, setPreview] = useState<string>("");

  // Keep variables array length in sync with varCount
  const variables = useMemo(() => {
    const base: AspectVariable[] = model.variables.length
      ? model.variables
      : Array.from({ length: varCount }, (_, i) => ({
          name: `VAR_${i + 1}`,
          dataType: "DOUBLE",
          unit: "",
          qualityCode: true,
          searchable: true,
        }));

    if (base.length === varCount) return base;
    if (base.length < varCount) {
      return [
        ...base,
        ...Array.from({ length: varCount - base.length }, (_, j) => ({
          name: `VAR_${base.length + j + 1}`,
          dataType: "DOUBLE" as const,
          unit: "",
          qualityCode: true,
          searchable: true,
        })),
      ];
    }
    return base.slice(0, varCount);
  }, [model.variables, varCount]);

  const updateVar = (i: number, next: AspectVariable) => {
    const copy = [...variables];
    copy[i] = next;
    setModel((m) => ({ ...m, variables: copy }));
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const payload: AspectTypePayload = { ...model, variables };
    setPreview(JSON.stringify(payload, null, 2));
    // TODO: send to API here
  };

  return (
    <section className= "aspect-form">
    <section className="stack gap">
      <h1>Create Aspect Type</h1>

      <form className="stack gap" onSubmit={submit}>
        <div className="grid2">
          <label>
            <span>Name</span>
            <input
              value={model.name}
              onChange={(e) => setModel({ ...model, name: e.target.value })}
              placeholder="ElectricalMetrics"
            />
          </label>
          <label>
            <span>Category</span>
            <select
              value={model.category}
              onChange={(e) => setModel({ ...model, category: e.target.value as any })}
            >
              <option value="dynamic">dynamic</option>
              <option value="static">static</option>
            </select>
          </label>
          <label>
            <span>Scope</span>
            <select
              value={model.scope}
              onChange={(e) => setModel({ ...model, scope: e.target.value as any })}
            >
              <option value="private">private</option>
              <option value="public">public</option>
            </select>
          </label>
          <label className="span2">
            <span>Description</span>
            <textarea
              value={model.description}
              onChange={(e) => setModel({ ...model, description: e.target.value })}
              placeholder="Electrical metrics for wind turbines"
            />
          </label>
        </div>

        <div className="card">
          <div className="row between">
            <strong>Variables</strong>
            <label className="row" title="How many variables?">
              <span>Count</span>
              <input
                type="number"
                min={1}
                value={varCount}
                onChange={(e) => setVarCount(Math.max(1, Number(e.target.value) || 1))}
                style={{ width: 90 }}
              />
            </label>
          </div>

          <div className="stack gap" style={{ marginTop: 12 }}>
            {variables.map((v, i) => (
              <VarRow key={i} idx={i} value={v} onChange={(n) => updateVar(i, n)} />
            ))}
          </div>
        </div>

        <div className="row end">
          <button type="submit" className="primary">
            Preview JSON
          </button>
        </div>
      </form>

      {preview && (
        <div className="card">
          <div className="row between">
            <strong>Payload preview</strong>
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(preview);
              }}
            >
              Copy
            </button>
          </div>
          <pre className="code">{preview}</pre>
        </div>
      )}
    </section>
    </section>
  );
}
