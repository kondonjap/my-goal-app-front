import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVenues, getEvents, createEvent } from "../api/idols";

export default function IdolEvents() {
  const [venues, setVenues] = useState([]);
  const [events, setEvents] = useState([]);

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [venueId, setVenueId] = useState("");
  const [ticketCost, setTicketCost] = useState("");
  const [drinkCost, setDrinkCost] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const load = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const [v, e] = await Promise.all([getVenues(), getEvents()]);
      setVenues(Array.isArray(v) ? v : []);
      setEvents(Array.isArray(e) ? e : []);
    } catch (err) {
      console.error(err);
      setErrorMsg("読み込みに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventName.trim() || !eventDate || !venueId) return;

    setSaving(true);
    setErrorMsg("");
    try {
      await createEvent({
        event_name: eventName.trim(),
        event_date: eventDate,
        venue_id: Number(venueId),
        ticket_cost: ticketCost === "" ? 0 : Number(ticketCost),
        drink_cost: drinkCost === "" ? 0 : Number(drinkCost),
        note: note.trim() || null,
      });

      setEventName("");
      setEventDate("");
      setVenueId("");
      setTicketCost("");
      setDrinkCost("");
      setNote("");
      await load();
    } catch (err) {
      console.error(err);
      setErrorMsg("登録に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">現場記録</h1>
            <p className="text-white/60 mt-2">イベント単位で記録する</p>
          </div>
          <Link className="text-white/80 hover:text-white" to="/idols">
            ← アイドルトップ
          </Link>
        </div>

        {errorMsg && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
            {errorMsg}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* 登録 */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="text-lg font-semibold mb-4">現場を追加</div>

            <div className="flex flex-col gap-2 mb-4">
              <label className="text-sm text-white/80">イベント名 *</label>
              <input
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="例）〇〇定期公演"
                required
              />
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <label className="text-sm text-white/80">日付 *</label>
              <input
                type="date"
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <label className="text-sm text-white/80">会場 *</label>
              <select
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
                value={venueId}
                onChange={(e) => setVenueId(e.target.value)}
                required
              >
                <option value="">選択してください</option>
                {venues.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white/80">チケ代</label>
                <input
                  type="number"
                  min="0"
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
                  value={ticketCost}
                  onChange={(e) => setTicketCost(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-white/80">ドリンク代</label>
                <input
                  type="number"
                  min="0"
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none"
                  value={drinkCost}
                  onChange={(e) => setDrinkCost(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label className="text-sm text-white/80">メモ（任意）</label>
              <textarea
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 min-h-[120px] outline-none"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="例）整理番号、良かった曲、物販の状況など"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-white/15 hover:bg-white/20 border border-white/10 px-4 py-3 font-semibold disabled:opacity-50"
            >
              {saving ? "登録中…" : "登録"}
            </button>
          </form>

          {/* 一覧 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold">現場一覧</div>
              <button
                onClick={load}
                className="rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-2 text-sm"
              >
                再読み込み
              </button>
            </div>

            {loading && <div className="text-white/70">読み込み中…</div>}

            {!loading && events.length === 0 && (
              <div className="text-white/70">まだ現場がありません</div>
            )}

            {!loading && events.length > 0 && (
              <div className="grid gap-3">
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded-xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="font-semibold">{ev.event_name}</div>
                    <div className="text-sm text-white/60 mt-1">
                      {ev.event_date} / {ev.venue?.name ?? "会場不明"}
                    </div>
                    <div className="text-sm text-white/70 mt-2">
                      チケ {ev.ticket_cost}円 / ドリンク {ev.drink_cost}円
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
