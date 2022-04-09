import { useState, useEffect } from 'react';
import { getTopArtists } from '../spotify';
import { catchErrors } from '../utils';
import { ArtistsGrid, SectionWrapper, TimeRangeButtons, Loader } from '../components';

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState('short');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopArtists(`${activeRange}_term`);
      setTopArtists(data);
    };

    catchErrors(fetchData());
  }, [activeRange]);

  console.log(topArtists);

  return (
    <main>
      {topArtists ? (
        <SectionWrapper title="Top Artists" breadcrumb={true}>
          <TimeRangeButtons
            activeRange={activeRange}
            setActiveRange={setActiveRange}
          />
          <ArtistsGrid artists={topArtists.items}></ArtistsGrid>
        </SectionWrapper>
      ) : (
        <Loader></Loader>
      )}
    </main>
  );
};

export default TopArtists;