import { DeleteIcon } from "./deleteIcon";
import { EditIcon } from "./editIcon";
import { ViewIcon } from "./viewIcon";

const FilesView = (props) => {
  const tmp = [
    {filename: "encrypted_Awesome.webp", uri: "blob:htt…"},
    {filename: "encrypted_Awesomeness.webp", uri: "blob…"},
    {filename: "encrypted_Amazing.webp", uri: "blob:htt…"},
    {filename: "encrypted_All-the-things.webp", uri: "b…"},
    {filename: "encrypted_first-kiss.gif", uri: "blob:h…"},
    {filename: "encrypted_Badass.webp", uri: "blob:http…"},
    {filename: "encrypted_Awkward.webp", uri: "blob:htt…"},
    {filename: "encrypted_BOOty.webp", uri: "blob:http:…"},
    {filename: "encrypted_giphy.webp", uri: "blob:http:…"},
    {filename: "encrypted_BRB.webp", uri: "blob:http://…"},
    {filename: "encrypted_Balance.webp", uri: "blob:htt…"},
    {filename: "encrypted_Beachy.webp", uri: "blob:http…"},
    {filename: "encrypted_Beetlejuice.webp", uri: "blob…"},
    {filename: "encrypted_Bet.webp", uri: "blob:http://…"},
    {filename: "encrypted_Blessed.webp", uri: "blob:htt…"},
    {filename: "encrypted_Blessing.webp", uri: "blob:ht…"},
    {filename: "encrypted_Believe.webp", uri: "blob:htt…"},
    {filename: "encrypted_Blimey.webp", uri: "blob:http…"},
    {filename: "encrypted_Bliss.webp", uri: "blob:http:…"},
    {filename: "encrypted_Blizzard.webp", uri: "blob:ht…"},
    {filename: "encrypted_Blossoms.webp", uri: "blob:ht…"},
    {filename: "encrypted_Boom.webp", uri: "blob:http:/…"},
    {filename: "encrypted_Boozy.webp", uri: "blob:http:…"},
    {filename: "encrypted_Boos.webp", uri: "blob:http:/…"},
    {filename: "encrypted_Bravo.webp", uri: "blob:http:…"},
    {filename: "encrypted_Break.webp", uri: "blob:http:…"},
    {filename: "encrypted_Bravery.webp", uri: "blob:htt…"},
    {filename: "encrypted_Breathe.webp", uri: "blob:htt…"},
    {filename: "encrypted_Brilliant.webp", uri: "blob:h…"},
    {filename: "encrypted_Breathless.webp", uri: "blob:…"},
    {filename: "encrypted_Bunnies.webp", uri: "blob:htt…"},
    {filename: "encrypted_Bucket-list.webp", uri: "blob…"},
    {filename: "encrypted_Butterball.webp", uri: "blob:…"},
    {filename: "encrypted_Champagne.webp", uri: "blob:h…"},
    {filename: "encrypted_Buttercup.webp", uri: "blob:h…"},
    {filename: "encrypted_Bruh.webp", uri: "blob:http:/…"},
    {filename: "encrypted_Calming.webp", uri: "blob:htt…"},
    {filename: "encrypted_But-first-coffee.webp", uri: ""},
    {filename: "encrypted_Change.webp", uri: "blob:http…"},
    {filename: "encrypted_Classic.webp", uri: "blob:htt…"},
    {filename: "encrypted_Cheers.webp", uri: "blob:http…"},
    {filename: "encrypted_Chillin.webp", uri: "blob:htt…"},
    {filename: "encrypted_Coming-soon.webp", uri: "blob…"},
    {filename: "encrypted_Clover.webp", uri: "blob:http…"},
    {filename: "encrypted_Confetti.webp", uri: "blob:ht…"},
    {filename: "encrypted_Countdown.webp", uri: "blob:h…"},
    {filename: "encrypted_Creepin.webp", uri: "blob:htt…"},
    {filename: "encrypted_Cottontail.webp", uri: "blob:…"},
    {filename: "encrypted_Days-like-these.webp", uri: "…"},
    {filename: "encrypted_Cup-o-cheer.webp", uri: "blob…"},
    {filename: "encrypted_Crescendo.webp", uri: "blob:h…"},
    {filename: "encrypted_Dont-quit-your-daydream.webp"},
    {filename: "encrypted_Cutest.webp", uri: "blob:http…"},
    {filename: "encrypted_Dream-big.webp", uri: "blob:h…"},
    {filename: "encrypted_Destination.webp", uri: "blob…"},
    {filename: "encrypted_Dreamy.webp", uri: "blob:http…"},
    {filename: "encrypted_Dreamer.webp", uri: "blob:htt…"},
    {filename: "encrypted_Dreaming.webp", uri: "blob:ht…"},
    {filename: "encrypted_Dreebp", uri: "blob:http://lo…"},
    {filename: "encrypted_Dreams.webp", uri: "blob:http…"},
    {filename: "encrypted_Eggy.webp", uri: "blob:http:/…"},
    {filename: "encrypted_Egg-cited.webp", uri: "blob:h…"},
    {filename: "encrypted_Enjoy.webp", uri: "blob:http:…"},
    {filename: "encrypted_Elfie.webp", uri: "blob:http:…"},
    {filename: "encrypted_Enchantment.webp", uri: "blob…"},
    {filename: "encrypted_Emotional.webp", uri: "blob:h…"},
    {filename: "encrypted_Endless.webp", uri: "blob:htt…"},
    {filename: "encrypted_Epic.webp", uri: "blob:http:/…"},
    {filename: "encrypted_Escape.webp", uri: "blob:http…"},
    {filename: "encrypted_Everything.webp", uri: "blob:…"},
    {filename: "encrypted_Exhale.webp", uri: "blob:http…"}
    ];
  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-start justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-3xl leading-normal">
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-3xl font-light">
                {tmp.map((image, i) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100" key={i}>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{image.filename}</span>
                      </div>
                    </td>
                    <td className="p-0 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-8 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <ViewIcon />
                        </div>
                        <div className="w-8 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <EditIcon />
                        </div>
                        <div className="w-8 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <DeleteIcon />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesView;
