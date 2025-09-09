"use client";
import { getPostLikeData, likePost, unLikePost } from "@/lib/actions/like";
import { SessionUser } from "@/lib/session";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery } from "@tanstack/react-query";

type Props = {
  postId: number;
  user?: SessionUser;
};
const Like = (props: Props) => {
  const { data, refetch: refetchPostLikeData } = useQuery({
    queryKey: ["GET_POST_LIKE_DATA", props.postId],
    queryFn: async () => await getPostLikeData(props.postId),
  });

  const likeMutation = useMutation({
    mutationFn: () => likePost(props.postId),
    onSuccess: () => refetchPostLikeData(),
  });

  const unlikeMutation = useMutation({
    mutationFn: () => unLikePost(props.postId),
    onSuccess: () => refetchPostLikeData(),
  });

  return (
    <div className="mt-3 flex items-center justify-start gap-2">
      {data?.userLikedPost ? (
        <button onClick={() => unlikeMutation.mutate()}>
          <SolidHeartIcon className="w-6 text-rose-600" />
        </button>
      ) : (
        <button onClick={() => likeMutation.mutate()}>
          <HeartIcon className="w-6" />
        </button>
      )}
      <p className="text-slate-600">{data?.likeCount}</p>
    </div>
  );
};

export default Like;
