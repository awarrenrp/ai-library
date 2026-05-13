import "./ChartDashboardDemo.css";
import { Button } from "../../pebbleButton";

/**
 * Tile IDs callers can pass as `selectedTileId` to highlight one chart in the
 * dashboard. Matches the Figma `Editing individual node on canvas` 810:15346
 * pattern — exactly one tile receives the focus-outline at a time.
 */
export const CHART_DASHBOARD_TILES = [
  { id: "headcount-by-dept", title: "Headcount by department", series: [42, 56, 38, 64, 49, 71, 58, 80] },
  { id: "open-roles", title: "Open roles by team", series: [22, 30, 18, 26, 33, 28, 22, 18] },
  { id: "hires-by-region", title: "Quarterly hires by region", series: [55, 48, 62, 70, 58, 65, 72, 84] },
] as const;

export type ChartDashboardTileId = (typeof CHART_DASHBOARD_TILES)[number]["id"];

export type ChartDashboardDemoProps = {
  /** Optional tile to highlight with the focus-outline. */
  selectedTileId?: ChartDashboardTileId;
  /** Fired when the user clicks a tile — wire to the parent's selection state. */
  onSelectTile?: (id: ChartDashboardTileId) => void;
};

/**
 * Compact dashboard preview used inside the Rippling-native artifact shell on
 * the Editing example. Three chart tiles laid out in a 2-up grid (3rd tile
 * spans the full row) so the surface mirrors a real product dashboard while
 * staying scoped to the docs page width.
 */
export function ChartDashboardDemo({ selectedTileId, onSelectTile }: ChartDashboardDemoProps = {}) {
  return (
    <div className="chart-dashboard-demo" role="group" aria-label="Dashboard tiles">
      {CHART_DASHBOARD_TILES.map((tile) => {
        const isSelected = selectedTileId === tile.id;
        return (
          <div
            key={tile.id}
            className="chart-dashboard-demo__tile"
            data-selected={isSelected || undefined}
          >
            <Button
              type={Button.TYPES.BUTTON}
              variant={Button.VARIANTS.TEXT}
              appearance={Button.APPEARANCES.GHOST}
              size={Button.SIZES.M}
              isFluid
              aria-pressed={isSelected}
              aria-label={`Open ${tile.title}`}
              onClick={() => onSelectTile?.(tile.id)}
            >
              <p className="chart-dashboard-demo__title">{tile.title}</p>
              <MiniBarChart series={tile.series} ariaLabel={`Trend for ${tile.title}`} />
            </Button>
          </div>
        );
      })}
    </div>
  );
}

function MiniBarChart({ series, ariaLabel }: { series: readonly number[]; ariaLabel: string }) {
  const max = Math.max(...series, 1);
  return (
    <div className="chart-dashboard-demo__chart" role="img" aria-label={ariaLabel}>
      {series.map((v, i) => (
        <span
          key={i}
          className="chart-dashboard-demo__bar"
          style={{ height: `${Math.max(8, Math.round((v / max) * 100))}%` }}
        />
      ))}
    </div>
  );
}
