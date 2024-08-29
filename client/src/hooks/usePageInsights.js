import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPageInsights = async (endpoint) => {
  const { data } = await axios.get(endpoint);
  return data;
};

const usePageInsights = (pageId, accessToken, since, until) => {
  const followersQuery = useQuery({
    queryKey: ['pageInsights', pageId, 'followers', since, until],
    queryFn: () => fetchPageInsights(`https://graph.facebook.com/v20.0/${pageId}/insights/page_follows?access_token=${accessToken}&since=${since}&until=${until}&period=total_over_range`),
  });

  const engagementQuery = useQuery({
    queryKey: ['pageInsights', pageId, 'engagement', since, until],
    queryFn: () => fetchPageInsights(`https://graph.facebook.com/v20.0/${pageId}/insights/page_post_engagements?access_token=${accessToken}&since=${since}&until=${until}&period=total_over_range`),
  });

  const impressionsQuery = useQuery({
    queryKey: ['pageInsights', pageId, 'impressions', since, until],
    queryFn: () => fetchPageInsights(`https://graph.facebook.com/v20.0/${pageId}/insights/page_impressions?access_token=${accessToken}&since=${since}&until=${until}&period=total_over_range`),
  });

  const reactionsQuery = useQuery({
    queryKey: ['pageInsights', pageId, 'reactions', since, until],
    queryFn: () => fetchPageInsights(`https://graph.facebook.com/v20.0/${pageId}/insights/page_actions_post_reactions_like_total?access_token=${accessToken}&since=${since}&until=${until}&period=total_over_range`),
  });
  const pageNameQuery = useQuery({
    queryKey: ['pageInsights', pageId, 'pageName'],
    queryFn: () => fetchPageInsights(`https://graph.facebook.com/v20.0/${pageId}?access_token=${accessToken}`),
  });

  return {
    followers: followersQuery,
    engagement: engagementQuery,
    impressions: impressionsQuery,
    reactions: reactionsQuery,
    pageName: pageNameQuery,
    isError: followersQuery.isError || engagementQuery.isError || impressionsQuery.isError || reactionsQuery.isError,
  };
};

export default usePageInsights;
