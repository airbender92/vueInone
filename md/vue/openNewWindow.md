const routeData = useRouter().resolve({
        name: 'items_disasterOps_envCheckTaskLog',
        query: {
          mode: 'view',
          taskId: row.id,
          taskInstanceId: row.instanceId,
          pageModeText: '检查任务日志'
        }
      });
      window.open(routeData.href, '_blank');