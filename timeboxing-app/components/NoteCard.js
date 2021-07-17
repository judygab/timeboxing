export default function NoteCard({ note }) {
  return (
    <div class="note-card bg-white p-2 w-40 h-40 rounded-2xl shadow-lg flex flex-row">
      <h2>{note.title}</h2>
      <p>{note.description}</p>
    </div>
  )
}
