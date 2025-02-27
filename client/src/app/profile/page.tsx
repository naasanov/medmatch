export default function Profile() {
  return (
    <>
      <h1 className="text-4xl font-semibold mb-4">Hello John Doe</h1>
      <div className="grid grid-cols-3 gap-4">
        {[...Array(5).keys()].map((i) => (
          <div
            key={i}
            className="border border-[#a8a8a8] flex p-4 h-40 flex-col rounded-2xl"
          >
            <div className="flex flex-col flex-wrap pb-2">
              <b>First Last</b>
              <small>Location</small>
            </div>
            <div>
              <span>
                bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio bio
                bio bio bio bio bio bio
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
