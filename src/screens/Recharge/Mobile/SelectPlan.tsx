import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import icons from '../../../assets/icons/icons';
import { Header } from '../../../components/Header/Header';
import TapMotion from '../../../components/TapMotion';
import { getPlansMobile } from '../../../lib/api';
import transitions from '../../../lib/transition';
import { providerDetails } from './util';

export const tabs = [
  'All Plans',
  'Data Add On',
  'Top Up',
  'Special Offer',
  'Full Talk Time',
  'Roaming',
  'SMS',
  'Validity',
];

export default function SelectPlan() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const phone = params.get('phone');
  const nickname = params.get('nickname');
  const type = params.get('type');
  const [plans, setPlans] = useState('');
  const provider = params.get('provider') as keyof typeof providerDetails;
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);
  const [ascending, setAscending] = useState<boolean>(true);

  function edit() {
    transitions(() => {
      navigate(`/recharge/mobile/number_select?phone=${phone}&nickname=${nickname}&type=${type}&provider=${provider}`, {
        replace: true,
      });
    }, 70)();
  }

  async function loadPlans() {
    const plans = await getPlansMobile(provider as string);
    // if (plans.status) {
    //   console.log(plans.data?.data);
    //   setPlans(JSON.stringify(plans.data?.data, null, 2));
    // }
  }

  useEffect(() => {
    loadPlans();
  }, []);

  return (
    <div className='colors font-normMid'>
      <Header onclick={edit}>
        <span className='font-normMid'>Select Plan</span>
      </Header>
      <div className='colors'>
        <div className='select-none'>
          <TapMotion size='lg' className='px-5' onClick={edit}>
            <div className='flex items-center justify-between rounded-2xl bg-inputBg px-4 py-4 pr-3 dark:bg-white/10'>
              <div className='flex flex-grow items-center gap-3'>
                <img src={providerDetails[provider].icon} className='aspect-square h-11 object-contain' />
                <div className='flex flex-col gap-1'>
                  <span className='text-sm'>{nickname}</span>
                  <span className='text-[0.7rem] capitalize opacity-70'>
                    {phone} — {providerDetails[provider].name} {type}
                  </span>
                </div>
              </div>
              <div className='tap95 block h-full rounded-lg p-3 text-xs text-accent transition-colors active:bg-accent/10'>
                <span>Edit</span>
              </div>
            </div>
          </TapMotion>

          <div className='mt-3 flex w-full flex-row gap-3 rounded-2xl px-5'>
            <div className='flex flex-grow items-center justify-center rounded-btn bg-inputBg pl-4 dark:bg-white/10'>
              <img src={icons.search} className='flex w-5 pb-0.5 opacity-40 dark:invert' />
              <input
                type='text'
                placeholder='Enter Amount or Search Plans'
                className='grow border-none bg-transparent px-3 text-sm font-420 text-text/90 outline-none dark:text-white'
                // onInput={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
                // value={nickname}
              />
            </div>
            <TapMotion
              className='flex aspect-square flex-grow-0 items-center justify-center rounded-btn bg-inputBg px-4 dark:bg-white/10'
              onClick={() => setAscending(!ascending)}
            >
              <img
                src={icons.ordering}
                className={`w-5 opacity-50 dark:invert ${
                  ascending ? 'rotate-0' : 'rotate-180'
                } transition-transform duration-300`}
              />
            </TapMotion>
          </div>
        </div>
        <div className='mt-1 select-none border border-transparent'>
          <div className='no-scrollbar flex gap-5 overflow-scroll px-5 py-4 pb-0 text-[0.8rem]'>
            {tabs.map((item, index) => (
              <div
                key={index}
                className={`${item === selectedTab ? 'selected' : ''} flex-shrink-0`}
                onClick={() => setSelectedTab(item)}
              >
                <span
                  className={`${
                    item == selectedTab ? 'text-accent' : 'opacity-80'
                  }  px-1 transition-colors active:text-accent`}
                >
                  {item}
                </span>
                {item === selectedTab ? (
                  <motion.div
                    className='mt-0.5 h-[2.5px] rounded-[2px] rounded-b-[0] bg-accent'
                    layoutId='underline'
                    transition={{ duration: 0.15 }}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='px-5 pt-3'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={selectedTab}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {selectedTab} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque aliquam totam ducimus dicta
            ullam, a provident quo omnis fugiat! Excepturi repudiandae modi, dolorum qui voluptatem sapiente expedita
            harum distinctio in unde recusandae molestiae. Placeat totam doloribus repudiandae cumque maiores dolor
            voluptates, facilis a voluptatem soluta amet molestias aut iusto cupiditate, saepe dicta reiciendis,
            possimus est. Facere quasi nemo voluptates magnam? Necessitatibus in rem ullam sed? Laudantium sit modi
            iusto quo. Eveniet quasi quaerat eius aperiam quia dolorem inventore fuga molestiae animi optio aspernatur
            facere provident id corporis sint at rem laboriosam sed quos placeat, perferendis in deserunt! Blanditiis,
            rem debitis, fuga suscipit ratione harum, fugit vel atque ullam distinctio animi maiores perspiciatis
            molestias consequatur exercitationem repellat! In porro exercitationem ab tempore enim, fuga ex obcaecati
            molestias consequatur neque fugit sunt quo nulla, corrupti deleniti tempora at voluptas illum excepturi
            odit, quam quia deserunt. Exercitationem eligendi nemo hic porro est consequuntur quidem facilis veritatis
            illo dolor beatae quam reprehenderit expedita illum vel iste, laboriosam nulla sequi accusamus, quia fugiat.
            Dicta tempore labore assumenda earum alias, cum expedita itaque vel tempora impedit sequi non debitis
            suscipit, facilis eum nulla temporibus eos iste odit culpa aperiam. Tenetur iure nesciunt pariatur dicta
            deserunt assumenda cumque mollitia sunt provident quae! Impedit amet rerum reprehenderit debitis totam, ab
            perferendis, reiciendis alias dignissimos consectetur placeat magnam corrupti quas exercitationem
            accusantium tenetur enim! Facilis, repellat quis? Dolor sint, a ea neque enim sunt numquam sed nesciunt,
            labore unde reprehenderit eius, illum quo repellendus quis eum ut eveniet ad consequuntur corrupti mollitia
            quia? Asperiores aliquam aliquid ipsum qui nisi laborum saepe hic nemo excepturi aperiam, at maxime quos?
            Cumque praesentium commodi officia necessitatibus dignissimos eaque distinctio in illo, iure iusto odio
            soluta fugit voluptates delectus atque sint assumenda vitae quia unde? Omnis voluptas esse quis, enim
            accusamus porro reiciendis? Doloribus veritatis vitae suscipit vero accusantium dignissimos ad numquam hic.
            Quam dignissimos soluta expedita veritatis et, ipsam esse excepturi distinctio aperiam minima at. Ducimus
            eum, esse ex id facere ipsam dignissimos, voluptatum ab doloremque, consectetur sapiente magni rerum
            doloribus maiores libero sequi. Consequatur pariatur dolorum numquam corrupti, quidem non dignissimos odio
            distinctio dicta veritatis tempore beatae. At est excepturi dolorem odio ipsam veniam ex consectetur
            nesciunt? Nemo deleniti, omnis ipsa itaque sed tempore illo placeat similique vitae id rem beatae veniam in
            alias culpa consectetur cumque autem inventore a porro? Eius nihil quod similique ad? Quas distinctio optio
            ullam dolore dicta reiciendis error, enim atque praesentium, voluptatum cumque sit quis impedit debitis
            soluta repudiandae quam mollitia modi, unde magnam suscipit sunt odio perspiciatis. Hic non quam dolor ex
            iusto veniam ea natus aliquid nemo, eligendi iure autem velit exercitationem saepe tempora temporibus vitae
            consequuntur reiciendis aliquam sint, ut omnis repellendus facilis earum? Voluptate itaque nihil architecto
            earum ut, consequatur ab fuga provident delectus ratione, quam velit? Officiis maiores voluptatem soluta
            fugit magnam quos quidem, nesciunt, a expedita commodi optio sint, est unde. Autem, omnis qui quidem
            voluptatum doloribus praesentium nobis asperiores sunt consectetur corrupti enim cumque exercitationem
            necessitatibus culpa. Non.
          </motion.div>
        </AnimatePresence>
      </div>
      <pre className='overflow-scroll'>
        <code className=''>{plans}</code>
      </pre>
    </div>
  );
}
